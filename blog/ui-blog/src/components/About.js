import React from 'react';
import './About.css';

import MarkdownGithub from 'react-markdown-github';

function About() {
    const content = `
My name is Koval Maksym, I am a java developer living in Ukraine. I’ve started working in IT in 2018. Primary working with Java and AWS services.

The most experience I have in Java and AWS. I am always open for something new and interested.

I started this blog, to organize my experience, take notes cool stuff and thoughts about tech.

I can be helpfull with:
- ☕ Java development
- ☁️ AWS services
- 🔥 Profiling and performance tuning
- 🧱 Organization cluster environments, monitoring, logging, CI\CD, etc.
`
    return <MarkdownGithub source={ content }  />;
}

export default About;