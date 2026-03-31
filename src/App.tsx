import React, { useState, useEffect } from 'react';
import { 
  Layout, 
  Database, 
  Server, 
  Code2, 
  CheckCircle2, 
  Circle, 
  Plus, 
  Trash2, 
  FolderTree,
  FileCode,
  Terminal
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  category: {
    id: number;
    name: string;
  };
}

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeTab, setActiveTab] = useState<'demo' | 'code' | 'structure'>('demo');
  const [newTaskTitle, setNewTaskTitle] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await fetch('/api/tasks');
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error("Failed to fetch tasks", err);
    }
  };

  const addTask = async () => {
    if (!newTaskTitle.trim()) return;
    try {
      await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTaskTitle, description: 'Added via UI', categoryName: 'General' })
      });
      setNewTaskTitle('');
      fetchTasks();
    } catch (err) {
      console.error("Failed to add task", err);
    }
  };

  const toggleTask = async (task: Task) => {
    try {
      await fetch(`/api/tasks/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...task, completed: !task.completed })
      });
      fetchTasks();
    } catch (err) {
      console.error("Failed to toggle task", err);
    }
  };

  const deleteTask = async (id: number) => {
    try {
      await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
      fetchTasks();
    } catch (err) {
      console.error("Failed to delete task", err);
    }
  };

  const javaCode = {
    pom: `<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.2.0</version>
    </parent>
    <groupId>com.example</groupId>
    <artifactId>task-manager</artifactId>
    <version>0.0.1-SNAPSHOT</version>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
    </dependencies>
</project>`,
    model: `package com.example.taskmanager.model;

/**
 * Encapsulation: Private fields with public getters/setters.
 */
public class Task {
    private Long id;
    private String title;
    private String description;
    private boolean completed;
    private Category category;

    public Task(Long id, String title, String description, Category category) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.category = category;
    }

    // Getters and Setters...
}`,
    service: `package com.example.taskmanager.service;

import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class TaskService {
    private List<Task> tasks = new ArrayList<>();
    private Long nextId = 1L;

    public List<Task> getAllTasks() { return tasks; }
    
    public Task addTask(Task task) {
        task.setId(nextId++);
        tasks.add(task);
        return task;
    }
    // CRUD logic...
}`,
    controller: `package com.example.taskmanager.controller;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public List<Task> getTasks() {
        return taskService.getAllTasks();
    }
    
    @PostMapping
    public Task createTask(@RequestBody Task task) {
        return taskService.addTask(task);
    }
}`
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#212529] font-sans">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-[#6DB33F] p-2 rounded-lg">
              <Server className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">Task Management System</h1>
              <p className="text-sm text-gray-500 italic">OOP in Practice: Spring Boot Architecture</p>
            </div>
          </div>
          <nav className="flex gap-1 bg-gray-100 p-1 rounded-xl">
            {[
              { id: 'demo', label: 'Live Demo', icon: Terminal },
              { id: 'structure', label: 'Project Structure', icon: FolderTree },
              { id: 'code', label: 'Java Source', icon: FileCode },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.id 
                    ? 'bg-white text-[#6DB33F] shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-8">
        <AnimatePresence mode="wait">
          {activeTab === 'demo' && (
            <motion.div 
              key="demo"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {/* Architecture Info */}
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4 flex items-center gap-2">
                    <Layout className="w-4 h-4" /> Layered Architecture
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">1</div>
                      <div>
                        <p className="font-bold text-sm">Controller Layer</p>
                        <p className="text-xs text-gray-500">Handles HTTP requests & REST endpoints.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-600 shrink-0">2</div>
                      <div>
                        <p className="font-bold text-sm">Service Layer</p>
                        <p className="text-xs text-gray-500">Contains business logic & CRUD operations.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 shrink-0">3</div>
                      <div>
                        <p className="font-bold text-sm">Model Layer</p>
                        <p className="text-xs text-gray-500">POJOs with Encapsulation (Private fields).</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#1e1e1e] p-6 rounded-2xl text-gray-300 font-mono text-xs shadow-xl">
                  <p className="text-[#6DB33F] mb-2">// Console Output</p>
                  <p>2026-03-31 14:58:15 INFO: Starting TaskManagerApplication...</p>
                  <p>2026-03-31 14:58:15 INFO: Initializing TaskService...</p>
                  <p>2026-03-31 14:58:15 INFO: TaskController exposed at /api/tasks</p>
                </div>
              </div>

              {/* Task List Demo */}
              <div className="md:col-span-2 space-y-6">
                <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold">Task Dashboard</h2>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        placeholder="New task title..."
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                        className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#6DB33F]/20"
                      />
                      <button 
                        onClick={addTask}
                        className="bg-[#6DB33F] text-white p-2 rounded-xl hover:bg-[#5a9a34] transition-colors"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {tasks.map((task) => (
                      <div 
                        key={task.id}
                        className="group flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-transparent hover:border-gray-200 transition-all"
                      >
                        <div className="flex items-center gap-4">
                          <button 
                            onClick={() => toggleTask(task)}
                            className={`transition-colors ${task.completed ? 'text-[#6DB33F]' : 'text-gray-300'}`}
                          >
                            {task.completed ? <CheckCircle2 className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
                          </button>
                          <div>
                            <p className={`font-semibold ${task.completed ? 'line-through text-gray-400' : ''}`}>
                              {task.title}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-[10px] uppercase font-bold tracking-widest text-[#6DB33F] bg-[#6DB33F]/10 px-2 py-0.5 rounded">
                                {task.category.name}
                              </span>
                              <span className="text-xs text-gray-400 italic">ID: {task.id}</span>
                            </div>
                          </div>
                        </div>
                        <button 
                          onClick={() => deleteTask(task.id)}
                          className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-red-500 transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'structure' && (
            <motion.div 
              key="structure"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm"
            >
              <h2 className="text-2xl font-bold mb-6">Maven Project Structure</h2>
              <div className="font-mono text-sm bg-gray-50 p-8 rounded-2xl border border-gray-100">
                <div className="space-y-1">
                  <p className="text-blue-600">task-manager/</p>
                  <p className="pl-4">├── <span className="text-orange-600">pom.xml</span> (Maven Config)</p>
                  <p className="pl-4">└── src/</p>
                  <p className="pl-8">└── main/</p>
                  <p className="pl-12">├── java/com/example/taskmanager/</p>
                  <p className="pl-16 text-green-600">│   ├── TaskManagerApplication.java (Entry Point)</p>
                  <p className="pl-16">│   ├── <span className="font-bold">controller/</span></p>
                  <p className="pl-16">│   │   └── TaskController.java</p>
                  <p className="pl-16">│   ├── <span className="font-bold">service/</span></p>
                  <p className="pl-16">│   │   └── TaskService.java</p>
                  <p className="pl-16">│   └── <span className="font-bold">model/</span></p>
                  <p className="pl-16">│       ├── Task.java</p>
                  <p className="pl-16">│       └── Category.java</p>
                  <p className="pl-12">└── resources/</p>
                  <p className="pl-16">└── application.properties</p>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'code' && (
            <motion.div 
              key="code"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              {[
                { title: 'pom.xml', code: javaCode.pom, lang: 'xml' },
                { title: 'Task.java (Model)', code: javaCode.model, lang: 'java' },
                { title: 'TaskService.java', code: javaCode.service, lang: 'java' },
                { title: 'TaskController.java', code: javaCode.controller, lang: 'java' },
              ].map((item, idx) => (
                <div key={idx} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                  <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{item.title}</span>
                    <Code2 className="w-4 h-4 text-gray-400" />
                  </div>
                  <pre className="p-4 text-xs font-mono overflow-x-auto bg-[#1e1e1e] text-gray-300 leading-relaxed">
                    <code>{item.code}</code>
                  </pre>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
