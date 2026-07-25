/**
 * Filters a list of cars based on search query and brand.
 * 
 * @param {Array} cars - The original list of cars
 * @param {string} searchQuery - The search query string
 * @param {string} selectedBrand - The selected brand filter ("All" or specific brand)
 * @returns {Array} - The filtered list of cars
 */
export const filterCars = (cars = [], searchQuery = "", selectedBrand = "All") => {
  const query = searchQuery.trim().toLowerCase();
  
  return cars.filter((car) => {
    // 1 & 3. Search by car name or brand (case-insensitive)
    const matchesSearch = 
      !query || 
      (car.name && car.name.toLowerCase().includes(query)) ||
      (car.brand && car.brand.toLowerCase().includes(query));
      
    // 2 & 4. Filter by brand
    const matchesBrand = 
      selectedBrand === "All" || 
      car.brand === selectedBrand;

    // 5. Combine both search and brand filters
    return matchesSearch && matchesBrand;
  });
};
