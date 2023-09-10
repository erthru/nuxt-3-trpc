<script setup lang="ts">
const { $client } = useNuxtApp();
const { data: todos, refresh } = await $client.todoRouter.getAll.useQuery();

const addTodo = async () => {
  await $client.todoRouter.create.mutate({
    task: `task ${new Date().getTime()}`,
  });

  refresh();
};

const deleteTodo = async (id: number) => {
  await $client.todoRouter.delete.mutate(id);
  refresh();
};
</script>

<template>
  <section>
    <button @click="addTodo">add todo</button>
    <ul style="display: flex; row-gap: 16px; flex-direction: column">
      <li v-for="todo in todos" :key="todo.id">
        <p style="display: inline">{{ todo.task }}</p>
        <button style="margin-left: 16px" @click="deleteTodo(todo.id)">
          Delete
        </button>
      </li>
    </ul>
  </section>
</template>
