select
    u.*
from
    users u;



create table users (
    id serial primary key ,
    full_name varchar(255) not null ,
    email varchar(255) not null ,
    password varchar(255) not null ,
    role varchar(50) not null ,
    bio text
);
drop table notes
create table notes (
    id SERIAL PRIMARY KEY,
    owner_id bigint,
    original_text text NOT NULL,
    ai_summarized_text text,
    generated_time timestamp default current_timestamp ,
    file_content bytea,
    file_link text,
    foreign key (owner_id) references users (id)
);

select
    n.*
from
    notes n;

insert into notes (original_text,generated_time ) values ('assistance to organize their study materials, to understand their study materials and to manage their tasks efficiently. The primary features of our application will be allowing students to upload their study materials, lecture notes and research papers as a file (PDF,text) and the application will automatically summaries the notes to make studies easier. Additionally, students can ask question related to their study materials, and system will provide answers relevant to their study materials. Furthermore, another important feature of StudyMate AI is its ability to generate model question papers based on the uploaded study materials. It will allow students to practice the papers and track their learning patterns, strengths and weakness using machine learning algorithms and give feedbacks to improve their study habits. The development of this application will use advanced technologies, including machine learning (ML), natural language processing (NLP), and android mobile app development frameworks. And the application will be designed with user friendly interfaces to ease the accessibility for students of all levels. Overall, our project targets to empower students with the facilities and resources they need to succeed in their studies. By utilizingthe power of AI technologies, we want to revolutionize the way of student’s self-directed learning and achieve their goals', current_timestamp )

SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'notes';