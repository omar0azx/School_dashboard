import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { saveAs } from "file-saver"; // For saving the file in browser
import MyTemplatePath from "../assets/finalReportTemplate.docx";

export function finalReportGen(student, opportunities) {
  // Load the finalReportTemplate.docx as a binary string (make sure you have the file available in your project)
  fetch(MyTemplatePath)
    .then((response) => response.arrayBuffer())
    .then((arrayBuffer) => {
      // Create a new PizZip instance with the loaded template file
      const zip = new PizZip(arrayBuffer);
      const doc = new Docxtemplater(zip);

      // Prepare the data to be injected into the template
      const reportData = {
        studentName: student.name,
        studentEmail: student.email,
        opportunities: opportunities.map((opportunity) => ({
          opportunityName: opportunity.name,
          organizationName: opportunity.organizationName,
          opportunityDescribtion: opportunity.description,
          hoursCompleted: opportunity.hour,
          date: opportunity.date,
        })),
      };

      // Set the template variables
      doc.setData(reportData);

      try {
        // Render the document (replace the placeholders with the data)
        doc.render();

        // Get the generated document as a binary string
        const generatedReport = doc.getZip().generate({ type: "blob" });

        // Save the generated report as a Word file
        saveAs(generatedReport, `FinalReport_${student.name}.docx`);
      } catch (error) {
        console.error("Error generating the report:", error);
      }
    })
    .catch((error) => {
      console.error("Error loading template:", error);
    });
}
