<script lang='ts'>
  // based on suggestions from:
  // Sami Keijonen https://webdesign.tutsplus.com/tutorials/how-to-make-custom-accessible-checkboxes-and-radio-buttons--cms-32074
  // and Inclusive Components by Heydon Pickering https://inclusive-components.design/toggle-button/

  export let options: Array<{value: string, label: string}>;
  export let radioSelected = options[0].value;
	
	const uniqueID = Math.floor(Math.random() * 100)

  const slugify = (str = "") =>
    str.toLowerCase().replace(/ /g, "-").replace(/\./g, "");
</script>

<div class="flex flex-row">
    <div role="radiogroup" 
				 class="flex items-center mr-4"
				 aria-labelledby={`label-${uniqueID}`}
				 id={`group-${uniqueID}`}>
  {#each options as { value, label }}
    <input
      class="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500"
      type="radio"
      id={slugify(label)}
      bind:group={radioSelected}
      value={value} />
    <label class="ml-2 mr-4 text-sm font-medium text-gray-900 dark:text-gray-300" for={slugify(label)}> {label} </label>
  {/each}
</div>
</div>
