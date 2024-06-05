import React, { useState } from "react";

const Filter = ({ tags, onFilter }) => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [durationRange, setDurationRange] = useState({ min: "", max: "" });

  const toggleTag = (tag) => {
    const index = selectedTags.indexOf(tag);
    if (index === -1) {
      setSelectedTags([...selectedTags, tag]);
    } else {
      setSelectedTags(
        selectedTags.filter((selectedTag) => selectedTag !== tag)
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(selectedTags, priceRange, durationRange);
  };

  return (
    <form onSubmit={handleSubmit} className="tag-filter">
      {tags.map((tag) => (
        <label key={tag} className="tag-filter__label">
          <input
            type="checkbox"
            value={tag}
            checked={selectedTags.includes(tag)}
            onChange={() => toggleTag(tag)}
            className="tag-filter__checkbox"
          />
          {tag}
        </label>
      ))}
      <div>
        <label>Ціна:</label>
        <label>
          від:
          <input
            type="number"
            value={priceRange.min}
            onChange={(e) =>
              setPriceRange({ ...priceRange, min: e.target.value })
            }
          />
        </label>
        <label>
          до:
          <input
            type="number"
            value={priceRange.max}
            onChange={(e) =>
              setPriceRange({ ...priceRange, max: e.target.value })
            }
          />
        </label>
      </div>
      <div>
        <label>Тривалість(днів):</label>
        <label>
          від:
          <input
            type="number"
            value={durationRange.min}
            onChange={(e) =>
              setDurationRange({ ...durationRange, min: e.target.value })
            }
          />
        </label>
        <label>
          до:
          <input
            type="number"
            value={durationRange.max}
            onChange={(e) =>
              setDurationRange({ ...durationRange, max: e.target.value })
            }
          />
        </label>
      </div>
      <button type="submit" className="tag-filter__button">
        Застосувати
      </button>
    </form>
  );
};

export default Filter;
