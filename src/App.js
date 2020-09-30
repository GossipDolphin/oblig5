import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
let todoCardList = [];
let completedTodoCardList = [];

export default function App() {
    return (
        <div className="App">
            <NavbarComp />
            <MainComp />
            <CreateTodoComp />
            <OverlayComp />
        </div>
    );
}

const NavbarComp = () => {
    return (
        <header className="topHeader">
            <h2 className="hiofTopBanner">HIOF</h2>
            <h2 className="userTopBanner">User user</h2>
        </header>
    )
}

const MainComp = () => {
    return (
        <main>
            <AddTodoButtonComp />
            <GenerateCards />
            <GenerateCompletedCardAndSearch />
        </main>
    )
}

const AddTodoButtonComp = () => {
    return (
        <section className="todoButtonSection" id="todoButtonSectionID">
            <p className="todoButtonText" onClick={openCreateTodoForm}>+ Todo</p>
        </section>
    )
}

const CreateTodoComp = () => {
    return (
        <section className="createTodoSection" id="createTodoSectionID">
            <CreateTodoHeaderComp />
            <section className="createTodoMainSection">
                <CardForm />
            </section>
        </section>
    )
}

const CreateTodoHeaderComp = () => {
    return (
        <section className="createTodoHeaderSection">
            <p>New Todo</p>
            <p id="closeFormCrossID" onClick={closeCreateTodoForm}>&#10005;</p>
        </section>
    )
}

class CardForm extends React.Component {
    constructor() {
        super();
        this.state = { title: '' };
        this.state = { author: '' };
        this.state = { description: '' };
        this.state = { textLength: 0 };

        this.handleChange = this.inputHandler.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    inputHandler = (event) => {
        if (event.target.name === "description") {
            const text = event.target.value;
            this.setState({ textLength: text.length }); //bruker state til å ha kontroll på antall bokstaver
        }
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });
    }

    handleSubmit(event) {
        setTodoCardList(todoCardList.concat(new TodoCard(
            this.state.title,
            this.state.description,
            this.state.author,
            new Date(Date.now()).toLocaleDateString())))
        event.preventDefault();
        closeCreateTodoForm();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} id="todoNoteFormID">
                <p>Title</p>
                <textarea
                    name="title"
                    value={this.state.title}
                    onChange={this.inputHandler}
                    placeholder="Todo title"
                    required id="todoTitleTextAreaID">
                </textarea>
                <p id="formDescriptionHeaderID">Description length is: {this.state.textLength} of max 50</p>
                <textarea
                    name="description"
                    value={this.state.description}
                    onChange={this.inputHandler}
                    maxLength="50"
                    required placeholder="Lorem ipsum dollare sitane"
                    id="descriptionTextAreaID"></textarea>
                <p>Author</p>
                <textarea
                    name="author"
                    value={this.state.author}
                    onChange={this.inputHandler}
                    placeholder="Author author"
                    required id="authorTextAreaID"></textarea>
                <button type="submit" value="Submit" id="createNoteID">Create</button>
            </form>
        )
    }
}

const OverlayComp = () => {
    return (
        <section className="overLay" id="overLayID"></section>
    )
}

function openCreateTodoForm() {
    document.getElementById("createTodoSectionID").style.visibility = 'visible';
    document.getElementById("overLayID").style.visibility = 'visible';
}

function closeCreateTodoForm() {
    document.getElementById("createTodoSectionID").style.visibility = 'hidden';
    document.getElementById("overLayID").style.visibility = 'hidden';
}

class TodoCard {
    constructor(title, description, author, dateCreated) {
        this.id = uuidv4();
        this.title = title;
        this.description = description;
        this.author = author;
        this.dateCreated = dateCreated;
    }
}
window.onload = generateDummyCards(3) + generateCompletedDummyCards(3);

function generateDummyCards(quantity) {
    for (let i = 0; i < quantity; i++) {
        todoCardList.push(new TodoCard("title " + i, "description " + i, "author", new Date(Date.now()).toLocaleDateString()))
    }
}
function setTodoCardList() { }
const GenerateCards = () => {
    const [list, setList] = useState(todoCardList); // eslint-disable-next-line
    setTodoCardList = setList;
    todoCardList = list;
    let jippi = "";
    if(todoCardList.length===0){
        jippi="Jippi! Ingen todos i dag";
    }
    return (
        <>
        <h3>{jippi}</h3>
        <section className="todoNotesSection" id="todoNotesSectionID">
            {list.map((card) => (
                <article key={card.id} className="noteArticle">
                    <h2>{card.title}</h2>
                    <p>{card.description}</p>
                    <button className="btnComplete" onClick={() => completedCard(card, card.id, list, setList)}>Complete</button>
                    <button className="btnDelete" onClick={() => deleteCard(card.id, list, setList)}>Delete</button>
                </article>
            ))}
        </section>
        </>
    )
}

function deleteCard(id, list, setList) {
    const newList = list.filter((item) => item.id !== id);
    setList(newList);
}

function completedCard(card, id, list, setList) {
    completedCardSetList(completedTodoCardList.concat(card));
    deleteCard(id, list, setList);
}

function generateCompletedDummyCards(quantity) {
    for (let i = 0; i < quantity; i++) {
        completedTodoCardList.push(new TodoCard("titleCompleted " + i, "descriptionCompleted " + i, "author", "9/" + (4 + i) + "/2020"))
    }
}

function completedCardSetList() { };
const GenerateCompletedCardAndSearch = () => {
    const [list, setList] = useState(completedTodoCardList); // eslint-disable-next-line
    completedCardSetList = setList;
    completedTodoCardList = list;

    const [searchTerm, setSearchTerm] = React.useState("");
    const [searchResults, setSearchResults] = React.useState([]);
    const handleChange = event => {
        setSearchTerm(event.target.value);
    };
    React.useEffect(() => {
        const results = completedTodoCardList.filter(completedTodoCardList =>
            completedTodoCardList.title.toLowerCase().includes(searchTerm)
        );
        setSearchResults(results);
    }, [searchTerm]);
    let listToMap;
    if (searchTerm.length > 0) {
        listToMap = searchResults;
    }
    else {
        listToMap = list;
    }
    function toggleSortByDate(event) {
        for (var i = 0; i < listToMap.length; i++) {
            for (var j = 0; j < listToMap.length; j++) {
                if (listToMap[j].dateCreated < listToMap[i].dateCreated) {
                    var temp = listToMap[i];
                    listToMap[i] = listToMap[j];
                    listToMap[j] = temp;
                }
            }
        }
        event=null;
        setSearchResults(listToMap);
    }

    return (
        <>
            <section className="completedTodosSection">
                <h2>Completed todos</h2>
                <section className="dateCheckboxSection">
                    <label htmlFor="date">Filter by date</label>
                    <input onChange={toggleSortByDate} type="checkbox" id="dateCheckBox" name="date" value="date"></input>
                </section>
                <section className="completedTodosHeaderSection">
                    <h4>Title</h4>
                    <h4>Author</h4>
                    <h4>Description</h4>
                    <h4>Completed date</h4>
                </section>
            </section>
            <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={handleChange} />
            <ul className="completedTodosListSection" id="completedTodosListSectionID">
                {listToMap.map((card) => (
                    <li key={card.id}>
                        <p>{card.title}</p>
                        <p>{card.author}</p>
                        <p>{card.description}</p>
                        <p>{card.dateCreated}</p>
                    </li>
                ))}
            </ul>
        </>
    )
}
