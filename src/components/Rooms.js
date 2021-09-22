function Rooms ({ currentRoom, setShowListMenu, setCurrentRoom}) {
    const handleRoomChange = (room) => {
      setCurrentRoom(room);
      setShowListMenu(false);
    };
    return (
      <div className="rooms">
        <h2>Select room</h2>
        <ul>
          <li
            onClick={() => {
              handleRoomChange("Iphone Werkstatt");
            }}
            className={currentRoom === "Iphone Werkstatt" ? "active" : ""}
          >
            Iphone Werkstatt
          </li>
          <li
            onClick={() => {
              handleRoomChange("Android Werkstatt");
            }}
            className={currentRoom === "Android Werkstatt" ? "active" : ""}
          >
            Android Werkstatt
          </li>
          <li
            onClick={() => {
              handleRoomChange("General");
            }}
            className={currentRoom === "General" ? "active" : ""}
          >
            General
          </li>
          <li
            onClick={() => {
              handleRoomChange("Logistik");
            }}
            className={currentRoom === "ReactJs" ? "active" : ""}
          >
            Logistik
          </li>
        </ul>
      </div>
    );
  }

  export default Rooms