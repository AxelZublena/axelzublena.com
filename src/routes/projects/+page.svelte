<script>
    import Project from "$lib/components/Project.svelte";
</script>

<svelte:head>
    <title>Projects</title>
    <meta
        name="description"
        content="Axel Zublena's portfolio. Software and applications I worked on."
    />
</svelte:head>

<h1 class="text-3xl sm:text-5xl text-blue-400 text-center pb-6">Projects</h1>
<Project
    thumbnail="/profile_pic.webp"
    title="Portfolio - Personal website"
    body="Website that shows what I can do and who I am."
    technologies={["sveltekit", "tailwind"]}
    link_github="github.com/AxelZublena/portfolio"
/>

<Project
    thumbnail="/projects/spell.webp"
    title="Spell Store"
    body="Android/IOS application built with Flutter. Built for a student association (Spell, Grenoble INP - Phelma), the application has accumulated over 300 downloads"
    technologies={["flutter", "dart"]}
    link_github="github.com/AxelZublena/spell"
    links_optional={[
        {
            title: "Play Store",
            src: "play.google.com/store/apps/details?id=com.axelz.spell",
        },
        {
            title: "App Store",
            src: "apps.apple.com/us/app/spell-store/id1666080766",
        },
    ]}
/>

<Project
    thumbnail="/projects/agent-steve.webp"
    title="Agent Steve"
    body="<span class='font-bold'>School Project:</span> A serious game developed for dutch elementary school students. The goal of the game is to educate the player on which data they can and cannot share online. To this end, you (Agent Steve) need to choose between multiple path."
    technologies={["typescript", "html5"]}
    link_github="github.com/agent-steve/ICT-Game-Project"
/>

<Project
    thumbnail="/projects/int-portal.webp"
    title="International Agents Portal"
    body="<span class='font-bold'>School Project:</span> The HZ Marketing Department is responsible to provide all the necessary data to the International Agents who are in charge of promoting HZ University abroad. The goal of this application was to replace the old static website used by the HZ Marketing Department by a new dynamic and presentable website."
    technologies={["php", "laravel"]}
    link_github="github.com/404GNF/International-Agents-Portal"
/>

<Project
    thumbnail="/projects/eventbrite.webp"
    title="Eventbrite QR Code"
    body="<span class='font-bold'>School Project:</span> Web application for HZ University of Applied Sciences's open dates. The goal is to extract and display the first and last name contained in an Eventbrite QR Code."
    technologies={["javascript", "html5"]}
    link_github="github.com/AxelZublena/EventbriteQRCode"
/>

<Project
    thumbnail="/projects/ars.webp"
    title="ARS Events"
    body="Web application to manage different simracing events. Manage your events, the content required for them, the participants, the date and much more. French is the only language supported."
    technologies={["node", "typescript"]}
    link_github="github.com/AxelZublena/ARS-Events"
/>
