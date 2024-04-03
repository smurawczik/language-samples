import tkinter as tk
from tkinter import ttk  # Import ttk module for themed widgets
from tkinter import filedialog, messagebox
import re
import os

class TextEditor(tk.Tk):
    def __init__(self):
        super().__init__()
        self.title("Text Editor")
        self.geometry("600x400")
        
        frame = tk.Frame(self)
        frame.pack(expand=True, fill="both")

        self.create_menu()
        
        # Listbox to display files
        self.file_listbox = tk.Listbox(frame, width=20)
        self.file_listbox.pack(side="left", fill="both", expand=True)
        self.file_listbox.bind("<Double-Button-1>", self.load_file)

        # Scrollbar for the listbox
        listbox_scrollbar = ttk.Scrollbar(self.file_listbox, orient="vertical", command=self.file_listbox.yview)
        listbox_scrollbar.pack(side="right", fill="y")
        self.file_listbox.config(yscrollcommand=listbox_scrollbar.set)

        # Text widget
        self.text_widget = tk.Text(frame, wrap="word", highlightcolor="dodgerblue", insertbackground="dodgerblue", highlightthickness=0, undo=True)
        self.text_widget.pack(side="left", expand=True, fill="both")
        self.text_widget.configure(autoseparators=True)
        # Auto focus on the text editor
        self.text_widget.focus_set()
        # Bind KeyRelease event to highlight_words function
        self.text_widget.bind("<KeyRelease>", self.highlight_words)

        # Scrollbar for the text widget
        text_scrollbar = ttk.Scrollbar(self.text_widget, orient="vertical", command=self.text_widget.yview)
        text_scrollbar.pack(side="right", fill="y")
        self.text_widget.config(yscrollcommand=text_scrollbar.set)


    def create_menu(self):
        menubar = tk.Menu(self)

        file_menu = tk.Menu(menubar, tearoff=0)
        file_menu.add_command(label="New", command=self.new_file)
        file_menu.add_command(label="Open", command=self.open_folder)
        file_menu.add_command(label="Save", command=self.save_file)
        file_menu.add_command(label="Save As", command=self.save_as_file)
        file_menu.add_separator()
        file_menu.add_command(label="Exit", command=self.quit)
        menubar.add_cascade(label="File", menu=file_menu)

        self.config(menu=menubar)

    def new_file(self, event=None):
        self.text_widget.delete("1.0", tk.END)

    def open_file(self, event=None):
        file_path = filedialog.askopenfilename(filetypes=[("All files", "*.*")])
        if file_path:
            with open(file_path, "r") as file:
                self.text_widget.delete("1.0", tk.END)
                self.text_widget.insert("1.0", file.read())
                
    def open_folder(self):
        folder_path = filedialog.askdirectory()
        if folder_path:
            self.folder_path = folder_path  # Store the chosen folder path
            self.list_files(folder_path)

    def list_files(self, folder_path):
        self.file_listbox.delete(0, tk.END)
        for root, dirs, files in os.walk(folder_path):
            relative_path = os.path.relpath(root, self.folder_path)
            if relative_path == ".":
                heading = "Root"
            else:
                heading = os.path.basename(relative_path)
            self.file_listbox.insert(tk.END, heading)
            for file in files:
                relative_file_path = os.path.relpath(os.path.join(root, file), self.folder_path)
                self.file_listbox.insert(tk.END, "    " + relative_file_path)

    def load_file(self, event=None):
        selection = self.file_listbox.curselection()
        if selection:
            file_index = selection[0]
            file_path = os.path.join(self.folder_path, self.file_listbox.get(file_index).strip())
            if os.path.isfile(file_path):
                with open(file_path, "r") as file:
                    self.text_widget.delete("1.0", tk.END)
                    self.text_widget.insert("1.0", file.read())

    def save_file(self, event=None):
        if not hasattr(self, "file_path"):
            self.save_as_file()
        else:
            with open(self.file_path, "w") as file:
                file.write(self.text_widget.get("1.0", tk.END))

    def save_as_file(self, event=None):
        file_path = filedialog.asksaveasfilename(filetypes=[("All files", "*.*")], title="Save File")
        if file_path:
            self.file_path = file_path
            self.save_file()

    def quit(self, event=None):
        if messagebox.askokcancel("Quit", "Are you sure you want to quit?"):
            super().quit()

    def highlight_words(self, event=None):
        # Define words to highlight and their corresponding colors
        highlight_dict = {
            "python": "blue",
            "text": "red",
            "editor": "green"
        }

        # Remove existing tags
        for tag in self.text_widget.tag_names():
            self.text_widget.tag_remove(tag, "1.0", tk.END)

        # Apply highlighting
        for word, color in highlight_dict.items():
            pattern = r'\b{}\b'.format(re.escape(word))
            for match in re.finditer(pattern, self.text_widget.get("1.0", tk.END)):
                start = f"1.0+{match.start()}c"
                end = f"1.0+{match.end()}c"
                self.text_widget.tag_add(word, start, end)
                self.text_widget.tag_config(word, foreground=color)

if __name__ == "__main__":
    app = TextEditor()
    app.mainloop()
