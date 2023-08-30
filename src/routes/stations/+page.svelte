<script>
    export let data;
</script>

<h1>Stations</h1>
<p>This is the stations page.</p>

<form method="post" action='?/stationQuery'>
    <label for="stationQuery">Stasjonssøk:
        <input placeholder="Søk på sted" name='stationQuery' autocomplete="off" />
    </label>
</form>

<ul>
    {#each data.stations as { id, name}}
        <li><a href="/stations/{id}">{name}</a></li>
    {/each}
</ul>