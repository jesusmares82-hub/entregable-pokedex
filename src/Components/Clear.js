const Clear = ({ handleClearTerm }) => {
  return (
    <div>
      <button onClick={() => handleClearTerm()}>Clear</button>
    </div>
  );
};

export default Clear;
