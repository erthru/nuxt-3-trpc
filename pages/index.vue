<script setup lang="ts">
import { Prisma } from "@prisma/client";

const { $client } = useNuxtApp();

const { data, refresh } = await $client.db.useQuery({
  model: "todo",
  fn: "findMany",
  args: {},
});

const addTodo = async () => {
  await $client.db.useQuery({
    model: "todo",
    fn: "create",
    args: {
      data: {
        task: `New Random Task ${new Date().getTime()}`,
      },
    } as Prisma.TodoCreateArgs,
  });

  refresh();
};
</script>

<template>
  <section>
    <button @click="addTodo">add todo</button>
    <pre>{{ data }}</pre>
  </section>
</template>
