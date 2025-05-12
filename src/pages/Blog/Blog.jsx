import React, { useState } from "react";

const Blog = () => {
  const [expandedBlog, setExpandedBlog] = useState(null);

  const blogs = [
    {
      id: 1,
      title: "The Art of Food Presentation",
      excerpt:
        "Food presentation is more than just making a dish look pretty. It's about creating an experience...",
      content: `Food presentation is more than just making a dish look pretty. It's about creating an experience that engages all the senses. A well-presented dish can elevate the dining experience, making it memorable and enjoyable. 
      
      Here are some tips for mastering the art of food presentation:
      - Use contrasting colors to make the dish visually appealing.
      - Arrange food in a way that creates balance and harmony on the plate.
      - Garnish with fresh herbs or edible flowers for a touch of elegance.
      
      Remember, people eat with their eyes first!`,
    },
    {
      id: 2,
      title: "Top 5 Foods to Try This Season",
      excerpt:
        "Every season brings its own unique flavors and ingredients. Here are the top 5 foods you must try this season...",
      content: `Every season brings its own unique flavors and ingredients. Here are the top 5 foods you must try this season:
      
      1. **Pumpkin Spice Latte**: A fall favorite that combines the warmth of spices with the sweetness of pumpkin.
      2. **Butternut Squash Soup**: Creamy, comforting, and perfect for chilly evenings.
      3. **Apple Cider Donuts**: A sweet treat that captures the essence of autumn.
      4. **Roasted Brussels Sprouts**: A healthy and delicious side dish with a hint of caramelization.
      5. **Cranberry Sauce**: A tangy and sweet addition to any holiday meal.
      
      Don't miss out on these seasonal delights!`,
    },
    {
      id: 3,
      title: "Why Farm-to-Table Dining Matters",
      excerpt:
        "Farm-to-table dining is more than just a trend. It's a movement that supports local farmers and promotes sustainability...",
      content: `Farm-to-table dining is more than just a trend. It's a movement that supports local farmers and promotes sustainability. By choosing farm-to-table restaurants, you're not only enjoying fresher and healthier food but also contributing to the local economy.
      
      Benefits of farm-to-table dining:
      - **Freshness**: Ingredients are sourced locally, ensuring maximum freshness.
      - **Sustainability**: Reduces the carbon footprint by minimizing transportation.
      - **Community Support**: Helps local farmers and businesses thrive.
      
      Next time you dine out, consider choosing a farm-to-table restaurant for a meal that's good for you and the planet.`,
    },
  ];

  const handleReadMore = (id) => {
    setExpandedBlog(expandedBlog === id ? null : id);
  };

  return (
    <div className="blog-container p-6 max-w-4xl mx-auto bg-[var(--bg-color)] text-[var(--text-color)]">
      <h1 className="text-3xl font-bold mb-4 text-center">Our Blog</h1>
      <p className="text-lg mb-6 text-[var(--text-secondary)] text-center">
        Explore our latest articles on food, dining, and culinary experiences.
      </p>
      <div className="blog-posts space-y-6">
        {blogs.map((blog) => (
          <div key={blog.id} className="blog-post p-4 border rounded-lg shadow-sm bg-[var(--card-bg)]">
            <h2 className="text-2xl font-semibold mb-2">{blog.title}</h2>
            <p className="text-[var(--text-secondary)]">
              {expandedBlog === blog.id ? blog.content : blog.excerpt}
            </p>
            <button
              onClick={() => handleReadMore(blog.id)}
              className="text-[var(--button-bg)] hover:underline mt-2 block"
            >
              {expandedBlog === blog.id ? "Read Less" : "Read More"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;