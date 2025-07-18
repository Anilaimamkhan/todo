import React, { useEffect, useState } from "react";
import "./Todo.css";
import { FiDelete } from "react-icons/fi";
import { BiEdit } from "react-icons/bi";

const getLocalItem = () => {
  let localItem = localStorage.getItem("list");
  console.log(localItem);
  if (localItem) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};
const Todo = () => {
  // to get from local storage

  const [inputChange, setInputChange] = useState("");
  const [addList, setAddList] = useState(getLocalItem());
  const [editBtn, setEditBtn] = useState(null);

  const handleChange = (e) => {
    setInputChange(e.target.value);
  };

  //   handler Add
  const handlerAdd = () => {
    if (!inputChange.trim()) return;
    if (editBtn) {
      let updateList = addList.map((item) =>
        item.id === editBtn.id ? { ...item, text: inputChange } : item
      );
      setAddList(updateList);
      setEditBtn(null);
      setInputChange("");
    } else {
      const newTodo = {
        id: Date.now().toString(), // unique ID
        text: inputChange,
      };
      setAddList([...addList, newTodo]);
      setInputChange("");
    }
  };

  //   handle Delet
  const handleDelet = (id) => {
    let deletId = addList.filter((item) => item.id !== id);
    console.log(deletId);
    setAddList(deletId);
  };

  //   handle Edit
  const handleEdit = (id) => {
    let editId = addList.find((item) => item.id === id);
    setInputChange(editId.text);
    setEditBtn(editId);
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(addList));
  }, [addList]);

  const handleClearAll = () => {
    setAddList([]);
  };
  return (
    <div className="mainContainer">
      <h2>Todo-List</h2>
      <div className="container">
        <input
          type="text"
          placeholder="TodoList..."
          onChange={handleChange}
          value={inputChange}
        />
        <button className="addBtn" onClick={handlerAdd}>
          {/* {editBtn === null ? "Add" : "Edit"} */}
          {editBtn === null ? "Add" : "Edit"}
        </button>
      </div>
      {/* LIST DISPLAY */}
      <div className="displayList">
        {addList.map((item) => {
          return (
            <div className="todoItem" key={item.id}>
              <p className="todoText">{item.text}</p>
              <div className="icon">
                <FiDelete
                  className="delete"
                  onClick={() => handleDelet(item.id)}
                />
                <BiEdit className="edit" onClick={() => handleEdit(item.id)} />
              </div>
            </div>
          );
        })}
      </div>
      <br />
      {addList.length > 1 ? (
        <button className="addBtn" onClick={handleClearAll}>
          Clear All
        </button>
      ) : null}
    </div>
  );
};

export default Todo;
