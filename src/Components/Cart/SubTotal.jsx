import React, { useContext, useMemo } from "react";
import { UserContext } from "../../context/UserContext";

function SubTotal({ cartItems, hasOrders,totalCoins }) {
  const { user } = useContext(UserContext);

  const total = useMemo(
    () => cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [cartItems]
  );

  const discount = useMemo(() => {
    let discountValue = 0;

    if (user?.discountEarnedWithGroup > 0) {
      discountValue += user.discountEarnedWithGroup;
    }

    if (
      user?.role === "coordinator" ||
      user?.role === "ambassador" ||
      user?.role === "admin"
    ) {
      discountValue += 20;
    }

    if (user?.dateOfBirth) {
      const userBirthday = new Date(user.dateOfBirth);
      const today = new Date();
      if (userBirthday.getMonth() === today.getMonth()) {
        discountValue += Math.max(discountValue, 5);
      }
    }

    if (!hasOrders) {
      discountValue += Math.max(discountValue, 20);
    }

    return discountValue;
  }, [user, hasOrders]);

  const shipping = total < 500 ? 5 : 0;

  const finalTotal = useMemo(
    () => total - (total * discount) / 100 + shipping,
    [total, discount, shipping]
  );

  return (
    <>
      {cartItems.length > 0 && (
        <div className="total">
          <span>
            <strong>Order :</strong> {total.toFixed(2)} $
          </span>
          <br />
          {user && (
            <>
              <span className="discount">
                <strong>Discount :</strong> {discount} %
              </span>
              <br />
              <span>
                <strong>Shipping :</strong>{" "}
                {shipping === 0 ? "Free" : `${shipping.toFixed(2)} $`}
              </span>
              <br />
              <span>
                <strong>Coins :</strong> {totalCoins.toFixed(2)} $
              </span>
              <br />
              <span>
                <strong>Total :</strong> {finalTotal.toFixed(2)} $
              </span>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default SubTotal;
