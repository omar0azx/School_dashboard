import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { saveAs } from "file-saver";
import MyTemplatePath from "../assets/reportTemplate.docx";

// Function to load the Word template from a static URL
async function loadTemplate(templateUrl) {
  try {
    const response = await fetch(templateUrl);
    const arrayBuffer = await response.arrayBuffer();
    return new Uint8Array(arrayBuffer);
  } catch (error) {
    console.error("Error loading template:", error);
    throw new Error("Failed to load template.");
  }
}

// Generate the Word document with placeholders filled
export async function generateReport(opportunity, student) {
  try {
    const templatePath = MyTemplatePath;
    const templateContent = await loadTemplate(templatePath);

    // Load template with PizZip and Docxtemplater
    const zip = new PizZip(templateContent);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    // Ensure the student object has the name property
    doc.setData({
      studentName: student?.name || opportunity?.studentName || "N/A",
      opportunityName:
        opportunity?.name || opportunity?.opportunityName || "N/A",
      city: opportunity ? opportunity.city || "N/A" : "N/A",
      date: opportunity ? opportunity.date || "N/A" : "N/A",
      description: opportunity ? opportunity.description || "N/A" : "N/A",
      hours: opportunity ? opportunity.hour || "N/A" : "N/A",
      organizationName: opportunity
        ? opportunity.organizationName || "N/A"
        : "N/A",
    });

    // Render the document with the provided data
    try {
      doc.render();
    } catch (error) {
      console.error("Error rendering template:", error);
      throw new Error("Failed to render the document.");
    }

    // Generate the filled .docx content
    const docxContent = doc.getZip().generate({
      type: "blob",
      mimeType:
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });

    // Download the generated Word document
    saveAs(
      docxContent,
      `تقرير_فرصة_${opportunity.name || opportunity?.opportunityName}.docx`
    );
  } catch (error) {
    console.error("Error generating Word document:", error);
  }
}
