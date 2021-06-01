
export function TodoItem(id, content, status="view") {
	this.id = id;
	this.text = content;
	this.status = status;

	this.complete = () => {
		this.status = this.status === "completed" ? "view" : "completed";
	}

	this.editing = () => {
		this.status = this.status === "view" ? "editing" : "view"; 
	}

	this.edit = (text) => {
		this.text = text;
	}
}
