<script>
    import {LinkedChart} from "svelte-tiny-linked-charts"
    export let data;
</script>

<h1>Station overview</h1>
<LinkedChart data={data.rainObservations} height={200} width={400} fill="#006edb" valuePosition="floating" showValue grow barMinHeight={5} />