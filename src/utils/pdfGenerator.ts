import jsPDF from "jspdf";

interface SanctionLetterData {
  applicantName: string;
  loanAmount: number;
  interestRate: number;
  term: number;
  emi: number;
  purpose: string;
  creditScore: number;
  approved: boolean;
  rejectionReasons?: string[];
  date: Date;
}

export const generateSanctionLetter = (data: SanctionLetterData): jsPDF => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  let y = 30;

  // Header
  doc.setFillColor(99, 102, 241); // Primary color
  doc.rect(0, 0, pageWidth, 50, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.text("LENDORA", margin, 25);

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text("AI-Powered Lending Platform", margin, 35);

  y = 70;

  // Document Title
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  const title = data.approved ? "LOAN SANCTION LETTER" : "LOAN APPLICATION DECISION";
  doc.text(title, pageWidth / 2, y, { align: "center" });

  y += 15;

  // Date and Reference
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 100, 100);
  doc.text(`Date: ${data.date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`, margin, y);
  doc.text(`Ref: LEN-${Date.now().toString(36).toUpperCase()}`, pageWidth - margin, y, { align: "right" });

  y += 20;

  // Applicant Details
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Applicant Details", margin, y);
  y += 8;

  doc.setFont("helvetica", "normal");
  doc.text(`Name: ${data.applicantName}`, margin, y);
  y += 6;
  doc.text(`Credit Score: ${data.creditScore}`, margin, y);
  y += 15;

  // Decision Box
  const boxColor = data.approved ? [34, 197, 94] : [239, 68, 68]; // Green or Red
  doc.setFillColor(boxColor[0], boxColor[1], boxColor[2]);
  doc.roundedRect(margin, y, pageWidth - 2 * margin, 25, 3, 3, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  const decision = data.approved ? "APPLICATION APPROVED" : "APPLICATION NOT APPROVED";
  doc.text(decision, pageWidth / 2, y + 15, { align: "center" });

  y += 40;

  if (data.approved) {
    // Loan Details Table
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Approved Loan Details", margin, y);
    y += 10;

    // Table
    const tableData = [
      ["Loan Amount", `$${data.loanAmount.toLocaleString()}`],
      ["Interest Rate", `${data.interestRate}% APR`],
      ["Loan Term", `${data.term} months`],
      ["Monthly EMI", `$${data.emi.toFixed(2)}`],
      ["Purpose", data.purpose],
      ["Total Repayment", `$${(data.emi * data.term).toFixed(2)}`],
    ];

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);

    tableData.forEach((row, index) => {
      const bgColor = index % 2 === 0 ? 245 : 255;
      doc.setFillColor(bgColor, bgColor, bgColor);
      doc.rect(margin, y - 5, pageWidth - 2 * margin, 10, "F");
      
      doc.setTextColor(100, 100, 100);
      doc.text(row[0], margin + 5, y + 2);
      doc.setTextColor(0, 0, 0);
      doc.text(row[1], pageWidth - margin - 5, y + 2, { align: "right" });
      y += 10;
    });

    y += 15;

    // Terms and Conditions
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("Terms and Conditions", margin, y);
    y += 8;

    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 80);
    const terms = [
      "1. This sanction letter is valid for 30 days from the date of issue.",
      "2. The loan is subject to verification of all submitted documents.",
      "3. Interest rate may vary based on final documentation review.",
      "4. Late payment fees apply for missed EMI payments.",
      "5. Prepayment is allowed with no penalty after 6 months.",
    ];

    terms.forEach((term) => {
      doc.text(term, margin, y);
      y += 6;
    });

  } else {
    // Rejection Details
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Decision Summary", margin, y);
    y += 10;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text("After careful evaluation of your application, we regret to inform you", margin, y);
    y += 6;
    doc.text("that we are unable to approve your loan request at this time.", margin, y);
    y += 15;

    if (data.rejectionReasons && data.rejectionReasons.length > 0) {
      doc.setFont("helvetica", "bold");
      doc.text("Primary Factors:", margin, y);
      y += 8;

      doc.setFont("helvetica", "normal");
      data.rejectionReasons.forEach((reason) => {
        doc.text(`• ${reason}`, margin + 5, y);
        y += 7;
      });
    }

    y += 10;
    doc.setFont("helvetica", "bold");
    doc.text("Recommendations to Improve Your Application:", margin, y);
    y += 8;

    doc.setFont("helvetica", "normal");
    const recommendations = [
      "• Improve your credit score by paying off existing debts",
      "• Maintain stable employment for at least 6 months",
      "• Reduce your debt-to-income ratio below 43%",
      "• Reapply after 3-6 months with improved financial standing",
    ];

    recommendations.forEach((rec) => {
      doc.text(rec, margin + 5, y);
      y += 6;
    });
  }

  // Footer
  const footerY = doc.internal.pageSize.getHeight() - 30;
  doc.setDrawColor(200, 200, 200);
  doc.line(margin, footerY - 10, pageWidth - margin, footerY - 10);

  doc.setFontSize(9);
  doc.setTextColor(120, 120, 120);
  doc.text("This is a demo document generated by Lendora AI for demonstration purposes.", pageWidth / 2, footerY, { align: "center" });
  doc.text("For actual loan applications, please contact our customer support.", pageWidth / 2, footerY + 6, { align: "center" });

  return doc;
};

export const downloadSanctionLetter = (data: SanctionLetterData): void => {
  const doc = generateSanctionLetter(data);
  const fileName = data.approved 
    ? `Lendora_Sanction_Letter_${data.applicantName.replace(/\s+/g, "_")}.pdf`
    : `Lendora_Decision_Letter_${data.applicantName.replace(/\s+/g, "_")}.pdf`;
  doc.save(fileName);
};
