import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [showAddFriendForm, setShowAddFriendForm] = useState(false);
  const [friendsList, setFriendsList] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);

  const handleShowFormAddFriend = () => {
    setShowAddFriendForm((showAddFriendForm) => !showAddFriendForm);
  };

  const handleAddFriend = (friend) => {
    setFriendsList((friendsList) => [...friendsList, friend]);
    setShowAddFriendForm(false);
  };

  const handleSelectedFriend = (friend) => {
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
    setShowAddFriendForm(false);
  };

  const handleSplitBill = (value) => {
    setFriendsList((friendsList) =>
      friendsList.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );

    setSelectedFriend(null);
  };

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friendsList={friendsList}
          onSelectedFriend={handleSelectedFriend}
          selectedFriend={selectedFriend}
        />
        {showAddFriendForm && <FormAddFriend onAddFriend={handleAddFriend} />}
        <Button onClick={handleShowFormAddFriend}>
          {showAddFriendForm ? "Close" : "Add Friend"}
        </Button>
      </div>
      {selectedFriend && (
        <FormSplitBill friend={selectedFriend} onSplitBill={handleSplitBill} />
      )}
    </div>
  );
}

function FriendsList({ friendsList, onSelectedFriend, selectedFriend }) {
  const friends = friendsList;
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          onSelectedFriend={onSelectedFriend}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, onSelectedFriend, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend.id;
  return (
    <li className={`${isSelected && "selected"}`}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          You own {friend.name} {Math.abs(friend.balance)}$
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} own you {Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}
      <Button onClick={() => onSelectedFriend(friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  const id = crypto.randomUUID();
  const handleAddFriend = (e) => {
    e.preventDefault();
    if (!name || !image) return;
    const newFriend = { name, image: `${image}?=${id}`, balance: 0, id };
    onAddFriend(newFriend);

    setName("");
    setImage("https://i.pravatar.cc/48");
  };

  return (
    <form className="form-add-friend">
      <label>🧑Friend name</label>
      <input value={name} onChange={(e) => setName(e.target.value)}></input>
      <label>📸Image URL</label>
      <input value={image} onChange={(e) => setImage(e.target.value)}></input>
      <Button onClick={handleAddFriend}>Add</Button>
    </form>
  );
}

function FormSplitBill({ friend, onSplitBill }) {
  const [bill, setBill] = useState("");
  const [payByUser, setPayByUser] = useState("");
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  const payByFriend = bill ? bill - payByUser : "";

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!bill || !payByUser) return;
    onSplitBill(whoIsPaying === "user" ? payByFriend : -payByUser);
  };

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {friend.name}</h2>
      <label>💵Bill value</label>
      <input
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      ></input>

      <label>🧑Your expense</label>
      <input
        value={payByUser}
        onChange={(e) =>
          setPayByUser(
            Number(e.target.value) > bill ? payByUser : Number(e.target.value)
          )
        }
      ></input>

      <label>🧑‍🤝‍🧑{friend.name}'s expense</label>
      <input value={payByFriend} disabled></input>

      <label>🤑Who is paying the bill?</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{friend.name}</option>
      </select>
      <Button>Split bill</Button>
    </form>
  );
}
