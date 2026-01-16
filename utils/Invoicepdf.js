import PDFDocument from "pdfkit";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/* ================= HELPERS ================= */

const drawLine = (doc, x1, y1, x2, y2) => {
  doc.moveTo(x1, y1).lineTo(x2, y2).stroke();
};

const drawBox = (doc, x, y, w, h) => {
  doc.rect(x, y, w, h).stroke();
};

const amountInWords = (num) => {
  // simple formatter (can be replaced with advanced one later)
  return `RUPEES ${num.toLocaleString("en-IN")} ONLY`;
};

/* ================= MAIN PDF ================= */

export const generateInvoicePDF = (invoice, res) => {
  const doc = new PDFDocument({ size: "A4", margin: 40 });

  /* ---------- RESPONSE ---------- */
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=Invoice-${invoice.invoiceNo || invoice._id}.pdf`
  );
  doc.pipe(res);

  /* ---------- WATERMARK ---------- */
  const logoPath = path.join(__dirname, "../../src/assets/logo.png");
  if (fs.existsSync(logoPath)) {
    doc.save();
    doc.opacity(0.06);
    doc.image(logoPath, 120, 230, { width: 350 });
    doc.restore();
  }

  /* ---------- HEADER ---------- */
  doc.font("Helvetica-Bold").fontSize(18).text("AEVIX CHEMICAL", 40, 40);
  doc.font("Helvetica").fontSize(9).text(
    "158 Lenin Sarani, 2nd Floor\nRoom No. 6/2B\nKolkata, West Bengal - 700013",
    40,
    65
  );

  doc
    .text("GSTIN : 19BQJPR8561B1ZG", 380, 40)
    .text(`Invoice No : ${invoice.invoiceNo || invoice._id}`, 380, 55)
    .text(
      `Invoice Date : ${new Date(invoice.date).toLocaleDateString("en-IN")}`,
      380,
      70
    );

  drawLine(doc, 40, 115, 555, 115);

  doc
    .font("Helvetica-Bold")
    .fontSize(14)
    .text("TAX INVOICE", 0, 125, { align: "center" });

  drawLine(doc, 40, 150, 555, 150);

  /* ---------- BUYER & CONSIGNEE BOX ---------- */
  const boxTop = 160;
  const boxHeight = 155;

  drawBox(doc, 40, boxTop, 515, boxHeight);
  drawLine(doc, 297, boxTop, 297, boxTop + boxHeight); // vertical separator

  doc.fontSize(10).font("Helvetica-Bold");
  doc.text("Details of Buyer | Billed to :", 45, boxTop + 5);
  doc.text("Details of Consignee | Shipped to :", 302, boxTop + 5);

  doc.font("Helvetica").fontSize(9);

  // Buyer
  doc.text(`Name : ${invoice.customer}`, 45, boxTop + 25);
  doc.text(`Address : ${invoice.address}`, 45, boxTop + 40, { width: 240 });
  doc.text(`Phone : ${invoice.phone}`, 45, boxTop + 75);
  doc.text(`GSTIN : ${invoice.gstin}`, 45, boxTop + 90);
  doc.text(`PAN : ${invoice.pan}`, 45, boxTop + 105);
  doc.text(`State : ${invoice.state}`, 45, boxTop + 120);
  doc.text(`Place of Supply : ${invoice.placeOfSupply}`, 45, boxTop + 135);

  // Consignee
  const c = invoice.consignee || {};
  doc.text(`Name : ${c.name || invoice.customer}`, 302, boxTop + 25);
  doc.text(
    `Address : ${c.address || invoice.address}`,
    302,
    boxTop + 40,
    { width: 240 }
  );
  doc.text(`Phone : ${c.phone || invoice.phone}`, 302, boxTop + 75);
  doc.text(`GSTIN : ${c.gstin || invoice.gstin}`, 302, boxTop + 90);
  doc.text(`State : ${c.state || invoice.state}`, 302, boxTop + 105);

  /* ---------- PRODUCT TABLE ---------- */
  const tableTop = boxTop + boxHeight + 10;
  const rowHeight = 28;

  const cols = [
    { x: 40, w: 30, label: "Sr" },
    { x: 70, w: 140, label: "Product / Service" },
    { x: 210, w: 60, label: "HSN" },
    { x: 270, w: 50, label: "Qty" },
    { x: 320, w: 60, label: "Rate" },
    { x: 380, w: 70, label: "Taxable" },
    { x: 450, w: 50, label: "CGST" },
    { x: 500, w: 55, label: "SGST" },
  ];

  // Header Row
  drawBox(doc, 40, tableTop, 515, rowHeight);
  cols.forEach((c) => drawLine(doc, c.x, tableTop, c.x, tableTop + rowHeight));
  doc.font("Helvetica-Bold").fontSize(9);
  cols.forEach((c) =>
    doc.text(c.label, c.x + 3, tableTop + 8)
  );

  // Data Row
  const dataTop = tableTop + rowHeight;
  drawBox(doc, 40, dataTop, 515, rowHeight * 2);
  cols.forEach((c) =>
    drawLine(doc, c.x, dataTop, c.x, dataTop + rowHeight * 2)
  );

  const qty = invoice.quantity;
  const rate = invoice.rate;
  const taxable = qty * rate;
  const cgst = taxable * 0.09;
  const sgst = taxable * 0.09;
  const total = taxable + cgst + sgst;

  doc.font("Helvetica").fontSize(9);
  doc.text("1", 45, dataTop + 10);
  doc.text(invoice.productName, 73, dataTop + 10, { width: 135 });
  doc.text(invoice.hsn || "-", 215, dataTop + 10);
  doc.text(`${qty} ${invoice.unit}`, 273, dataTop + 10);
  doc.text(rate.toFixed(2), 323, dataTop + 10);
  doc.text(taxable.toFixed(2), 383, dataTop + 10);
  doc.text(cgst.toFixed(2), 453, dataTop + 10);
  doc.text(sgst.toFixed(2), 503, dataTop + 10);

  /* ---------- TOTALS SECTION ---------- */
  const summaryTop = dataTop + rowHeight * 2 + 10;

  // Amount in words box
  drawBox(doc, 40, summaryTop, 300, 60);
  doc.font("Helvetica-Bold").text("Total in Words", 45, summaryTop + 5);
  drawLine(doc, 40,summaryTop+15, 340, summaryTop+15);
  doc.font("Helvetica").fontSize(9).text(
    amountInWords(total),
    45,
    summaryTop + 25,
    { width: 290 }
  );

  // Tax summary box
  drawBox(doc, 350, summaryTop, 205, 100);
  doc.font("Helvetica").fontSize(9);
  doc.text("Taxable Amount", 355, summaryTop + 10);
  doc.text(` ${taxable.toFixed(2)}`,480, summaryTop + 10, { align: "right" });
  doc
  .moveTo(350, summaryTop + 25)   // start X, Y
  .lineTo(555, summaryTop + 25)   // end X, Y
  .stroke();
  doc.text("Add : CGST", 355, summaryTop + 30);
  doc.text(` ${cgst.toFixed(2)}`, 480, summaryTop + 30, { align: "right" });
  doc  
  .moveTo(350, summaryTop + 45)
  .lineTo(555, summaryTop + 45)
  .stroke();

 
  doc.text("Add : SGST", 355, summaryTop + 50);
  doc.text(` ${sgst.toFixed(2)}`, 480, summaryTop + 50, { align: "right" });
 doc  
 .moveTo(350, summaryTop + 65)
  .lineTo(555, summaryTop + 65)
  .stroke();

  doc.font("Helvetica-Bold");
  doc.text("Total Amount", 355, summaryTop + 75);
  doc.text(` ${total.toFixed(2)}`, 480, summaryTop + 75, { align: "right" });

  /* ---------- BANK DETAILS ---------- */
  const bankTop = summaryTop + 110;
  drawBox(doc, 40, bankTop, 300, 85);

  doc.font("Helvetica-Bold").text("Bank Details", 45, bankTop + 5);
  drawLine(doc, 40, 545, 340, 545);
  doc.font("Helvetica").fontSize(9);
  doc.text(`Bank : ${invoice.bankDetails?.bankName}`, 45, bankTop + 25);
  doc.text(`Account No : ${invoice.bankDetails?.accountNo}`, 45, bankTop + 40);
  doc.text(`IFSC : ${invoice.bankDetails?.ifsc}`, 45, bankTop + 55);

  /* ---------- FOOTER ---------- */
  drawLine(doc, 40, bankTop + 100, 555, bankTop + 100);

  doc
    .fontSize(9)
    .text(
      "Certified that the particulars given above are true and correct.",
      350,
      bankTop + 20
    );

  doc.font("Helvetica-Bold").text("For AEVIX CHEMICAL", 350, bankTop + 50);
  doc.fontSize(8).text("Authorised Signatory", 350, bankTop + 70);

  doc.end();
};
