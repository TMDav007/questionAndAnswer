//seed data
const createAndSeed = `

  DROP TABLE IF EXISTS users CASCADE;
  DROP TYPE IF EXISTS status;
  DROP EXTENSION IF EXISTS pgcrypto;
  CREATE EXTENSION pgcrypto;
  CREATE TYPE status as ENUM ('admin','user');
  CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    user_name VARCHAR (50) UNIQUE NOT NULL,
    email VARCHAR (255) UNIQUE NOT NULL,
    password VARCHAR (150) NOT NULL,
    user_role status DEFAULT 'user'
  );
  INSERT INTO users (
    user_name,
    email,
    password,
    user_role
  )
  VALUES (
    'Tkenny',
    'tkenny@gmail.com',
    crypt('${process.env.pass3}', gen_salt('${process.env.KEY}', 5)),
    'admin'
  );
  INSERT INTO users (
    user_name,
    email,
    password
  )
  VALUES (
    'Hbeeq',
    'hqey@yahoo.com',
    crypt('${process.env.pass1}', gen_salt('${process.env.KEY}', 5))
  );
  INSERT INTO users (
    user_name,
    email,
    password
  )
  VALUES (
    'Hbeeq200',
    'hqey200@yahoo.com',
    crypt('${process.env.pass2}', gen_salt('${process.env.KEY}', 5))
  );

  DROP TABLE IF EXISTS questions CASCADE;
  CREATE TABLE questions (
    id SERIAL PRIMARY KEY,
    question TEXT NOT NULL,
    no_of_answers SMALLINT DEFAULT 0,
    date DATE,
    user_id INT REFERENCES users(id) ON DELETE CASCADE
  );

  INSERT INTO questions(
    question,
    date,
    user_id
  )
  VALUES (
    'Request to fix the AC',
    '23-09-2019',
    2
  );
  
  
  DROP TABLE IF EXISTS comments CASCADE;
  DROP TYPE IF EXISTS like_status;
  CREATE TYPE like_status as ENUM ('yes','no');
  CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    comment TEXT NOT NULL,
    likes like_status DEFAULT 'no',
    users_id INT REFERENCES users(id) ON DELETE CASCADE,
    question_id INT REFERENCES questions(id) ON DELETE CASCADE 
  );
  INSERT INTO comments(
    comment,
    users_id,
    question_id
  )
  VALUES (
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta corporis alias voluptas nesciunt quidem illo odit accusantium voluptatem, libero, cum rerum praesentium. Tenetur quis fugiat praesentium voluptas possimus officiis',
    1,
    1
  );

  INSERT INTO comments(
    comment,
    users_id,
    question_id
  )
  VALUES (
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta corporis alias voluptas nesciunt quidem illo odit accusantium voluptatem, libero, cum rerum praesentium. Tenetur quis fugiat praesentium voluptas possimus officiis',
    3,
    1
  );

`;

export default {
  createAndSeed
}