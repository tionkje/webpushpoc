<script>
  import { onMount } from 'svelte';
  import { env } from '$env/dynamic/public';

  const arrayBufferToBase64 = (buffer) =>
    btoa(
      [...new Uint8Array(buffer)]
        .map((x) => eval(`"\\x${('0' + x.toString(16)).slice(-2)}"`))
        .join('')
    )
      .replace(/(\/)/g, '_')
      .replace(/\+/g, '-')
      .replace(/=/g, '');

  export let data;

  function register(subscription) {
    fetch('./api/register', { method: 'POST', body: JSON.stringify(subscription) });
  }

  let subscription;
  onMount(async () => {
    const registration = await navigator.serviceWorker.ready;
    const newSubs = await registration.pushManager.getSubscription();
    console.log(newSubs);

    if (newSubs && env.PUBLIC_VAPID === arrayBufferToBase64(newSubs.options.applicationServerKey)) {
      subscription = newSubs;
      register(subscription);
    } else {
      subscription = false;
    }
  });

  async function subscribe() {
    const registration = await navigator.serviceWorker.ready;

    subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: env.PUBLIC_VAPID,
    });
    register(subscription);
  }
</script>


{#if subscription}
  {JSON.stringify(subscription)}
{:else if subscription === false}
  <button on:click={subscribe}>Subscribe</button>
{/if}

<br />
<button on:click={() => fetch('./api/resetdb')}>Reset</button>

{#each data.subs as sub}
  <br />
  <button on:click={() => fetch('./api/sendnotification', { method: 'POST', body: sub })}
    >{JSON.parse(sub).keys.auth}</button
  >
{/each}
