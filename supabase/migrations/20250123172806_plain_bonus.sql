/*
  # Insert Initial Data for WoodCraft

  1. Categories
    - Insert 6 main product categories
    
  2. Products
    - Insert sample products for each category
*/

-- Insert Categories
INSERT INTO categories (name, slug, description, image_url, featured) VALUES
  ('Wooden Houses', 'wooden-houses', 'Beautiful and sustainable wooden homes', 'https://images.unsplash.com/photo-1518780664697-55e3ad937233', true),
  ('Small Cabins', 'small-cabins', 'Cozy cabins for any purpose', 'https://images.unsplash.com/photo-1587061949409-02df41d5e562', true),
  ('Storage Sheds', 'storage-sheds', 'Practical storage solutions', 'https://images.unsplash.com/photo-1518733057094-95b53143d2a7', true),
  ('Carports', 'carports', 'Protect your vehicles', 'https://images.unsplash.com/photo-1486006920555-c77dcf18193c', true),
  ('Sauna', 'sauna', 'Traditional and modern saunas', 'https://images.unsplash.com/photo-1515362778563-6a8d0e44bc0b', true),
  ('Building Materials & Others', 'building-materials', 'Quality materials and accessories', 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122', true);

-- Insert sample products for each category
-- Wooden Houses
INSERT INTO products (category_id, name, slug, description, price, specifications, images) 
SELECT 
  (SELECT id FROM categories WHERE slug = 'wooden-houses'),
  'Wooden House ' || n,
  'wooden-house-' || n,
  'Beautiful wooden house with modern design and sustainable materials.',
  ROUND((200000 + random() * 300000)::numeric, 2),
  '{"size": {"width": 12, "length": 15, "height": 8}, "bedrooms": 3, "bathrooms": 2, "features": ["Insulated walls", "Double glazed windows", "Underfloor heating"]}'::jsonb,
  ARRAY['https://images.unsplash.com/photo-1518780664697-55e3ad937233']
FROM generate_series(1, 6) n;

-- Small Cabins
INSERT INTO products (category_id, name, slug, description, price, specifications, images)
SELECT 
  (SELECT id FROM categories WHERE slug = 'small-cabins'),
  'Small Cabin ' || n,
  'small-cabin-' || n,
  'Cozy cabin perfect for weekend getaways.',
  ROUND((50000 + random() * 100000)::numeric, 2),
  '{"size": {"width": 6, "length": 8, "height": 4}, "rooms": 2, "features": ["Kitchenette", "Bathroom", "Sleeping loft"]}'::jsonb,
  ARRAY['https://images.unsplash.com/photo-1587061949409-02df41d5e562']
FROM generate_series(1, 6) n;

-- Storage Sheds
INSERT INTO products (category_id, name, slug, description, price, specifications, images)
SELECT 
  (SELECT id FROM categories WHERE slug = 'storage-sheds'),
  'Storage Shed ' || n,
  'storage-shed-' || n,
  'Practical storage solution for your garden tools and equipment.',
  ROUND((2000 + random() * 5000)::numeric, 2),
  '{"size": {"width": 3, "length": 4, "height": 2.5}, "features": ["Weather resistant", "Lockable door", "Ventilation"]}'::jsonb,
  ARRAY['https://images.unsplash.com/photo-1518733057094-95b53143d2a7']
FROM generate_series(1, 6) n;

-- Carports
INSERT INTO products (category_id, name, slug, description, price, specifications, images)
SELECT 
  (SELECT id FROM categories WHERE slug = 'carports'),
  'Carport ' || n,
  'carport-' || n,
  'Protect your vehicle from the elements.',
  ROUND((3000 + random() * 7000)::numeric, 2),
  '{"size": {"width": 4, "length": 6, "height": 3}, "features": ["UV resistant roof", "Strong foundation", "Optional side panels"]}'::jsonb,
  ARRAY['https://images.unsplash.com/photo-1486006920555-c77dcf18193c']
FROM generate_series(1, 6) n;

-- Saunas
INSERT INTO products (category_id, name, slug, description, price, specifications, images)
SELECT 
  (SELECT id FROM categories WHERE slug = 'sauna'),
  'Sauna ' || n,
  'sauna-' || n,
  'Traditional Finnish sauna with modern features.',
  ROUND((8000 + random() * 12000)::numeric, 2),
  '{"size": {"width": 2.5, "length": 2.5, "height": 2.2}, "capacity": "4-6 persons", "features": ["Electric heater", "LED lighting", "Ventilation system"]}'::jsonb,
  ARRAY['https://images.unsplash.com/photo-1515362778563-6a8d0e44bc0b']
FROM generate_series(1, 6) n;

-- Building Materials
INSERT INTO products (category_id, name, slug, description, price, specifications, images)
SELECT 
  (SELECT id FROM categories WHERE slug = 'building-materials'),
  'Building Material ' || n,
  'building-material-' || n,
  'High-quality building materials for your projects.',
  ROUND((100 + random() * 1000)::numeric, 2),
  '{"type": "Various", "quality": "Premium", "features": ["Weather resistant", "Sustainable", "Easy to work with"]}'::jsonb,
  ARRAY['https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122']
FROM generate_series(1, 6) n;