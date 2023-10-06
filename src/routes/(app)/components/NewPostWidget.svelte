<div class="w-128 mt-4 rounded-sm p-8 bg-gray-200">
			<form class="my-4" method="POST" action="?/newPost">
				<div>
					<label class="label text-slate-500 mr-4" for="name">Text </label>
					<input
						type="text"
						name="text"
						autocomplete="off"
						placeholder="Type here"
						class="ring-1 ring-slate-200 focus:outline-none rounded-sm input w-full"
					/>
				</div>
				<div>
					<label class="label text-slate-500 mr-4" for="name">ID </label>
					<input
						type="text"
						name="objectId"
						autocomplete="off"
						placeholder="Type here"
						class="ring-1 ring-slate-200 focus:outline-none rounded-sm input w-full"
					/>
				</div>
				<div class="h-2" />
				<div>
					<button>Post</button>
				</div>
			</form>
		</div>