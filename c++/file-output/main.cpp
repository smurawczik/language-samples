#include <ncurses.h>
#include <string>

int main()
{
  // Initialize ncurses
  initscr();
  raw();
  keypad(stdscr, TRUE);
  echo(); // Echo the input

  printw("Simple Text Editor (press Ctrl+X to save and exit)\n");
  printw("Enter the file name: ");

  // Get the file name
  char filename[100];
  getstr(filename);

  // Turn off the echo
  noecho();

  // Open file
  FILE *file = fopen(filename, "w");
  if (file == NULL)
  {
    printw("Error opening file!\n");
    return 1;
  }

  printw("File '%s' has been created. You can start typing.\n", filename);

  int ch;
  int line = 1;
  printw("%d: ", line);
  while ((ch = getch()) != 24)
  { // Ctrl+X to exit
    putc(ch, file);
    if (ch == '\n')
    {
      line++;
      printw("\n%d: ", line);
    }
    else
    {
      printw("%c", ch);
    }
  }

  // Close file
  fclose(file);

  // Clean up ncurses
  endwin();

  return 0;
}
