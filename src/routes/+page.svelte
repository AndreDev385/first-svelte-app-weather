<script lang="ts">
	import { applyAction, enhance, type SubmitFunction } from '$app/forms';
	import { Card, Helper, Img, Input, Label, Spinner } from 'flowbite-svelte';
	import type { ActionData } from './$types';

	export let form: ActionData;

	let loading = false;

	const search: SubmitFunction = () => {
		loading = true;

		return async ({ result }) => {
			loading = false;
			if (result.type === 'failure') {
				return await applyAction({ ...result, data: { ...form, errors: result.data?.errors } });
			}
			return await applyAction(result);
		};
	};
</script>

<div class="mt-10">
	<h1 class="text-center dark:text-white text-slate-600 font-bold text-4xl">Today Weather</h1>
	<Card class="mx-auto">
		<form use:enhance={search} action="?/search" method="POST">
			<Label for="city" class="mb-2">City</Label>
			<Input name="city" id="city" />
			{#if form?.errors}
				<Helper class="mt-2" color="red"><span>{form.errors.city}</span></Helper>
			{/if}
			<button
				class="bg-blue-700 w-full p-2 rounded-md mt-2 text-white hover:bg-blue-500"
				type="submit"
				aria-busy={loading}
				class:secondary={loading}
			>
				{#if loading}
					<Spinner />
				{:else}
					Search
				{/if}
			</button>
		</form>
	</Card>
	<Card class="mx-auto mt-4">
		{#if form?.data}
			<h2 class="text-center font-bold text-2xl">{form?.data.city} - {form?.data.country}</h2>
			<div class="flex flex-row p-2 justify-evenly items-center py-2">
				<div class="flex flex-col">
					<Img src={form?.data.condition.icon} class="w-24 h-24" />
					<h4 class="text-lg text-center font-bold">{form?.data.condition.text}</h4>
				</div>
				<div class="flex flex-col p-2">
					<h3 class="text-xl font-bold">Temp: {form?.data.temperature}º C</h3>
					<h4 class="text-lg font-bold">Feels like: {form?.data.feelsLike}º C</h4>
				</div>
			</div>
		{:else}
			<h2 class="text-center font-bold text-2xl">Search a city</h2>
		{/if}
	</Card>
</div>
