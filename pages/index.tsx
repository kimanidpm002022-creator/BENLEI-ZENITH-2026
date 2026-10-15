/* globals */
@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
  @apply bg-slate-950 text-slate-100;
}

* {
  box-sizing: border-box;
}

a {
  text-decoration: none;
}

button {
  cursor: pointer;
}

::selection {
  background: rgba(34, 211, 238, 0.4);
}
