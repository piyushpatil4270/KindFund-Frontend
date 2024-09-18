import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const CampaignComponent = ({ title, date, amount }) => {
  const downloadPDF = () => {
    const doc = new jsPDF();

  
    doc.setProperties({
      title: "Campaign Receipt From Charity.Org",
      subject: "Receipt for campaign donation",
      author: "Your Organization",
    });


    doc.setFontSize(22);
    doc.setTextColor(40);
    doc.text("Campaign Receipt", 20, 20);


    doc.setLineWidth(0.5);
    doc.line(20, 25, 190, 25);

    
    doc.setFontSize(12);
    doc.setTextColor(60);
    doc.text(`Campaign Title: ${title}`, 20, 40);
    doc.text(`Amount Donated: ₹${amount}`, 20, 50);
    doc.text(`Date: ${new Date(date).toLocaleDateString()}`, 20, 60);

   
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text("Thank you for your contribution!", 20, 280);


    doc.save('campaign-receipt.pdf');
  };

  return (
    <div>
      <button onClick={downloadPDF}>Get Receipt</button>
    </div>
  );
};

export default CampaignComponent;
