import { Injectable, NotFoundException } from '@nestjs/common';
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
    async findOne(id: string): Promise<Task> {
        const task = await this.repo.findOneBy({ id });
        if (!task) throw new NotFoundException('Task not found');
        return task;
    }

    // UPDATE
    async update(id: string, dto: UpdateTaskDto) {
        const task = await this.findOne(id);

        // dacă se trimite completed
        if (typeof dto.completed === 'boolean' && dto.completed !== task.completed) {
            task.completed = dto.completed;
            task.completedAt = dto.completed ? new Date() : null;
        }

        // update restul câmpurilor (dacă vin)
        if (typeof dto.title === 'string') task.title = dto.title;
        if (typeof dto.description === 'string' || dto.description === null) task.description = dto.description ?? undefined;
        if (dto.dueDate !== undefined) task.dueDate = dto.dueDate ?? undefined;

        return this.repo.save(task);
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
