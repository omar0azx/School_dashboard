import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { saveAs } from "file-saver";
import MyTemplatePath from "../assets/template.docx";

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

    // Set placeholder values to match the placeholders in the Word template
    doc.setData({
      name: student.name || "N/A",
      opportunity: opportunity.name || "N/A",
      city: opportunity.city || "Jeddah",
      date: opportunity.date || "N/A",
      description: opportunity.description || "العمل التطوعي",
      hours: opportunity.hour || "0",
      organizationName: opportunity.organizationName,
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
    saveAs(docxContent, `تقرير_فرصة_${opportunity.name}.docx`);
  } catch (error) {
    console.error("Error generating Word document:", error);
  }
}
