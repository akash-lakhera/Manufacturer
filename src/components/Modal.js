function Modal(props) {
  let classes = "modal-container";
  let lists = "";
  const handleShow = () => {
    props.setShow(!props.show);
  };

  if (props.show) classes = "modal-container show";
  if (props.current) {
    lists = [];
    Object.keys(props.current).map((key) => {
      if (key == "orderID") lists[0] = <li key={key}>{props.current[key]}</li>;
      else if (key == "quantity")
        lists[1] = <li key={key}>{props.current[key]}</li>;
      else lists[2] = <li key={key}>{props.current[key]}</li>;
    });
  }

  return (
    <>
      <div className={classes}>
        <div className="modal-main">
          <div onClick={handleShow} className="close">
            X
          </div>
          <div className="msg-container">
            {" "}
            <ul className="msg-ul">
              <li>Order ID</li>
              <li>Quantity</li>
              <li>Manufacturer</li>
            </ul>
            <ul className="msg-ul">{lists}</ul>
          </div>
        </div>
      </div>
    </>
  );
}
export default Modal;
