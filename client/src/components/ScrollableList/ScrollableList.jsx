// ScrollableList.jsx
import React, { useRef, useEffect } from "react";
import { Reorder } from "framer-motion";
import "./scrollable-list.css";

const isTouchDevice = () => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

const ScrollableList = ({
  axis = "y",
  items,
  setItems,
  renderItem,
  maxHeight = "400px",
  maxWidth = "100%"
}) => {
  const containerRef = useRef(null);

  // Mobile drag-to-scroll behavior
  useEffect(() => {
    if (!isTouchDevice()) return;

    const container = containerRef.current;
    let isDown = false;
    let startX;
    let startY;
    let scrollLeft;
    let scrollTop;

    const handleMouseDown = (e) => {
      isDown = true;
      startX = e.pageX - container.offsetLeft;
      startY = e.pageY - container.offsetTop;
      scrollLeft = container.scrollLeft;
      scrollTop = container.scrollTop;
    };

    const handleMouseLeave = () => (isDown = false);
    const handleMouseUp = () => (isDown = false);

    const handleMouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const y = e.pageY - container.offsetTop;
      const walkX = x - startX;
      const walkY = y - startY;
      container.scrollLeft = scrollLeft - walkX;
      container.scrollTop = scrollTop - walkY;
    };

    container.addEventListener("mousedown", handleMouseDown);
    container.addEventListener("mouseleave", handleMouseLeave);
    container.addEventListener("mouseup", handleMouseUp);
    container.addEventListener("mousemove", handleMouseMove);

    return () => {
      container.removeEventListener("mousedown", handleMouseDown);
      container.removeEventListener("mouseleave", handleMouseLeave);
      container.removeEventListener("mouseup", handleMouseUp);
      container.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      className="scrollable-list-container"
      ref={containerRef}
      style={{ maxHeight, maxWidth }}
    >
      <Reorder.Group axis={axis} values={items} onReorder={setItems} as="ul">
        {items.map((item, idx) => (
          <Reorder.Item
            key={item.id || item.title || idx}
            value={item}
            as="li"
            className={`scrollable-list-item ${axis === "x" ? "horizontal" : "vertical"}`}
          >
            {renderItem(item)}
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  );
};

export default ScrollableList;
