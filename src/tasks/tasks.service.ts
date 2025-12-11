import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../tasks/tasks.entity';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private readonly repo: Repository<Task>,
    ) { }

    // CREATE
    create(dto: CreateTaskDto) {
        const task = this.repo.create(dto);
        return this.repo.save(task);
    }

    // GET ALL
    findAll() {
        return this.repo.find();
    }

    // GET ONE
    findOne(id: string) {
        return this.repo.findOneBy({ id });
    }

    // UPDATE
    async update(id: string, dto: UpdateTaskDto) {
        await this.repo.update(id, dto);
        return this.findOne(id);
    }

    // DELETE
    remove(id: string) {
        return this.repo.delete(id);
    }

    // STATS (pentru dashboard)
    async getStats() {
        const tasks = await this.repo.find();
        const today = new Date().toDateString();

        return {
            total: tasks.length,
            completed: tasks.filter(t => t.completed).length,
            pending: tasks.filter(t => !t.completed).length,
            today: tasks.filter(t =>
                t.dueDate && new Date(t.dueDate).toDateString() === today
            ).length,
        };
    }
}
