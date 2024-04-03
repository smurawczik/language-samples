import tkinter as tk
from tkinter import filedialog, messagebox

class TextEditor(tk.Tk):
    def __init__(self):
        super().__init__()
        self.title("Text Editor")
        self.geometry("600x400")

        self.text_widget = tk.Text(self, wrap="word")
        self.text_widget.pack(expand=True, fill="both")

        self.create_menu()

        # Bind typing event to the highlight_words function
        self.text_widget.bind("<Key>", self.highlight_words)

    def create_menu(self):
        menubar = tk.Menu(self)

        file_menu = tk.Menu(menubar, tearoff=0)
        file_menu.add_command(label="New", command=self.new_file)
        file_menu.add_command(label="Open", command=self.open_file)
        file_menu.add_command(label="Save", command=self.save_file)
        file_menu.add_command(label="Save As", command=self.save_as_file)
        file_menu.add_separator()
        file_menu.add_command(label="Exit", command=self.quit)
        menubar.add_cascade(label="File", menu=file_menu)

        self.config(menu=menubar)

    def new_file(self):
        self.text_widget.delete("1.0", tk.END)

    def open_file(self):
        file_path = filedialog.askopenfilename(filetypes=[("Text files", "*.txt")])
        if file_path:
            with open(file_path, "r") as file:
                self.text_widget.delete("1.0", tk.END)
                self.text_widget.insert("1.0", file.read())

    def save_file(self):
        if not hasattr(self, "file_path"):
            self.save_as_file()
        else:
            with open(self.file_path, "w") as file:
                file.write(self.text_widget.get("1.0", tk.END))

    def save_as_file(self):
        file_path = filedialog.asksaveasfilename(defaultextension=".txt", filetypes=[("Text files", "*.txt")])
        if file_path:
            self.file_path = file_path
            self.save_file()

    def quit(self):
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
            start = "1.0"
            while True:
                start = self.text_widget.search(word, start, stopindex=tk.END)
                if not start:
                    break
                end = f"{start}+{len(word)}c"
                self.text_widget.tag_add(word, start, end)
                self.text_widget.tag_config(word, foreground=color)
                start = end

if __name__ == "__main__":
    app = TextEditor()
    app.mainloop()
