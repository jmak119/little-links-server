/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema
        .createTable('logs', table => {
            table.increments('id').primary();
            table.string('toilet');
            table.string('sleep');
            table.string('meals');
            table.date('date');
            table.integer('student_id').unsigned().notNullable();
            table.integer('teacher_id').unsigned().notNullable();

            //   define the foreign key
            table
                .foreign('student_id')
                .references('id')
                .inTable('students')
                .onDelete('CASCADE');

            table
                .foreign('teacher_id')
                .references('id')
                .inTable('teachers')
                .onDelete('CASCADE');
        })

        .createTable('students', table => {
            table.increments('id').primary();
            table.string('name');
            table.string('class');
            table.string('dob');
        })

        .createTable('teachers', table => {
            table.increments('id').primary();
            table.string('name');    
        })

        .createTable('comments', table => {
            table.increments('id').primary();
            table.string('comment');
            table.time('time');
            table.integer('student_id').unsigned().notNullable();
            table.integer('teacher_id').unsigned().notNullable();
            table.increments('log_id').unsigned().notNullable();

            //   define the foreign key
            table
                .foreign('student_id')
                .references('id')
                .inTable('students')
                .onDelete('CASCADE');

            table
                .foreign('teacher_id')
                .references('id')
                .inTable('teachers')
                .onDelete('CASCADE');
            
            table
                .foreign('log_id')
                .references('id')
                .inTable('logs')
                .onDelete('CASCADE');
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('comments').dropTable('logs').dropTable('students').dropTable('teachers');
};
