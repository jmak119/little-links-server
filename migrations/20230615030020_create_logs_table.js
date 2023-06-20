/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema

        .createTable('teachers', table => {
            table.increments('id').primary();
            table.string('name');
        })

        .createTable('students', table => {
            table.increments('id').primary();
            table.string('name');
            table.integer('teacher_id').unsigned().notNullable();

            // define foreign key
            table
                .foreign('teacher_id')
                .references('id')
                .inTable('teachers')
                .onDelete('CASCADE');
        })


        .createTable('logs', table => {
            table.increments('id').primary();
            table.integer('student_id').unsigned().notNullable();
            table.integer('teacher_id').unsigned().notNullable();
            table.date('date');
            table.string('type');
            table.time('start_time');
            table.time('end_time');
            table.string('description');
            
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

        .createTable('comments', table => {
            table.increments('id').primary();
            table.string('comment');
            table.time('time');
            table.integer('student_id').unsigned().notNullable();
            table.integer('teacher_id').unsigned().notNullable();
            table.integer('log_id').unsigned().notNullable();

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
