declare const Office: any;
declare const Word: any;

export const isOfficeJsAvailable = (): boolean => {
  return typeof Office !== 'undefined' && typeof Word !== 'undefined';
};

export const insertTextToWord = async (text: string): Promise<boolean> => {
  if (!isOfficeJsAvailable()) {
    console.warn('Office.js API is not loaded. Simulating insertion into web buffer.');
    return false;
  }

  try {
    await Word.run(async (context: any) => {
      const selection = context.document.getSelection();
      selection.insertText(text, Word.InsertLocation.replace);
      await context.sync();
    });
    return true;
  } catch (error) {
    console.error('Word Add-in Error inserting text:', error);
    return false;
  }
};

export const getSelectedTextFromWord = async (): Promise<string> => {
  if (!isOfficeJsAvailable()) {
    return '';
  }

  try {
    let selectedText = '';
    await Word.run(async (context: any) => {
      const selection = context.document.getSelection();
      selection.load('text');
      await context.sync();
      selectedText = selection.text;
    });
    return selectedText;
  } catch (error) {
    console.error('Word Add-in Error getting text:', error);
    return '';
  }
};

export const insertFormattedHeadingToWord = async (headingText: string, level: number = 1): Promise<boolean> => {
  if (!isOfficeJsAvailable()) return false;

  try {
    await Word.run(async (context: any) => {
      const selection = context.document.getSelection();
      const paragraph = selection.insertParagraph(headingText, Word.InsertLocation.after);
      paragraph.font.name = 'Times New Roman';
      paragraph.font.size = level === 1 ? 16 : 14;
      paragraph.font.bold = true;
      paragraph.font.color = level === 1 ? '#1E3A8A' : '#0F766E';
      await context.sync();
    });
    return true;
  } catch (error) {
    console.error('Word Add-in Error inserting heading:', error);
    return false;
  }
};

export const insertFormattedTableToWord = async (
  headers: string[],
  rows: string[][],
  tableTitle?: string
): Promise<boolean> => {
  if (!isOfficeJsAvailable()) return false;

  try {
    await Word.run(async (context: any) => {
      const selection = context.document.getSelection();

      if (tableTitle) {
        const titlePara = selection.insertParagraph(tableTitle, Word.InsertLocation.after);
        titlePara.font.name = 'Times New Roman';
        titlePara.font.size = 13;
        titlePara.font.bold = true;
        titlePara.alignment = Word.Alignment.center;
      }

      const tableData = [headers, ...rows];
      const table = selection.insertTable(tableData.length, headers.length, Word.InsertLocation.after, tableData);

      table.font.name = 'Times New Roman';
      table.font.size = 13;
      table.alignment = Word.Alignment.center;

      // Set 1pt solid black borders
      table.getBorder(Word.BorderLocation.top).color = '#000000';
      table.getBorder(Word.BorderLocation.top).width = 1;
      table.getBorder(Word.BorderLocation.bottom).color = '#000000';
      table.getBorder(Word.BorderLocation.bottom).width = 1;
      table.getBorder(Word.BorderLocation.left).color = '#000000';
      table.getBorder(Word.BorderLocation.left).width = 1;
      table.getBorder(Word.BorderLocation.right).color = '#000000';
      table.getBorder(Word.BorderLocation.right).width = 1;
      table.getBorder(Word.BorderLocation.insideHorizontal).color = '#000000';
      table.getBorder(Word.BorderLocation.insideHorizontal).width = 1;
      table.getBorder(Word.BorderLocation.insideVertical).color = '#000000';
      table.getBorder(Word.BorderLocation.insideVertical).width = 1;

      // Header row styling
      const headerRow = table.rows.getFirst();
      headerRow.font.bold = true;
      headerRow.shadingColor = '#F1F5F9';

      await context.sync();
    });
    return true;
  } catch (error) {
    console.error('Word Add-in Error inserting formatted table:', error);
    return false;
  }
};
