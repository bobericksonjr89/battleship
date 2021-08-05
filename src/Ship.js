const Ship = (length, name) => {
  let health = length;

  const hit = () => {
    if (!isSunk()) {
      health--;
      console.log(health);
      return true;
    }
    return false;
  };

  const isSunk = () => {
    if (health === 0) {
      return true;
    }
    return false;
  };
  return { length, name, hit, isSunk };
};
module.exports = Ship;

// hit returns true or false (false if already hit)
// isSunk returns true or false;
