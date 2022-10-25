import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div>
      <footer data-testid="footer">
        <Link to="/drinks">
          <img
            src="../images/drinkIcon.svg"
            alt="drinkIcon"
            data-testid="drinks-bottom-btn"
          />
        </Link>

        <Link to="/meals">
          <img
            src="../images/mealIcon.svg"
            alt="mealIcon"
            data-testid="meals-bottom-btn"
          />
        </Link>
      </footer>
    </div>
  );
}

export default Footer;
