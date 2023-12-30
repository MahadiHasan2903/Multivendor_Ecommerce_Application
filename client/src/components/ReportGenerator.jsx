import jsPDF from "jspdf";
import "jspdf-autotable";
import styles from "../styles/styles";

const ReportGenerator = ({ data, reportTitle, columns }) => {
  const generatePdf = () => {
    const doc = new jsPDF();

    // Add header: Report Title
    doc.setFontSize(16);
    doc.text(reportTitle, 14, 10);

    // Add "Report Generated Date"
    const currentDate = new Date().toLocaleDateString();
    doc.setFontSize(10);
    doc.text(`Report Generated Date: ${currentDate}`, 130, 10);

    // Filter out specific headers like 'Edit', 'Preview', 'Delete'
    const filteredHeaders = columns
      .filter((col) => !["Edit", "Preview", "Delete"].includes(col.headerName))
      .map((col) => col.headerName);

    // Add table content using autoTable
    doc.autoTable({
      head: [filteredHeaders],
      body: data.map((row) =>
        columns
          .filter(
            (col) => !["Edit", "Preview", "Delete"].includes(col.headerName)
          )
          .map((col) => row[col.field])
      ),
    });

    // Save the PDF
    doc.save(`${reportTitle}.pdf`);
  };

  return (
    <div className="flex justify-start w-full">
      <div
        className={`${styles.button} !w-max !h-[45px] px-3 !rounded-[5px] mx-3 mb-3`}
        onClick={generatePdf}
      >
        <span className="text-white">Generate Report</span>
      </div>
    </div>
  );
};

export default ReportGenerator;
