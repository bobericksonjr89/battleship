const Ship = (length) => {
  const health = [];

  const hit = (number) => {
    if (health[number] != true) {
      health[number] = true;
      return true;
    }
    return false;
  };

  const isSunk = () => {
    if (health.length === length && health.every((x) => x === true)) {
      return true;
    }
    return false;
  };
  return { length, hit, isSunk };
};

//export default Ship;

// hit returns true or false (false if already hit)
// isSunk returns true or false;
