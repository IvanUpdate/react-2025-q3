import GitHubIcon from '../../assets/github-icon';

const About = () => {
  return (
    <div className="mx-auto max-w-md text-blue p-6 text-center">
      <h1 className="text-2xl font-bold">About This App</h1>
      <p className="mt-2">Author: Ivan Mironov</p>
      <a
        href="https://github.com/IvanUpdate"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-400 underline"
      >
        <p>
          <GitHubIcon />
          Github
        </p>
      </a>
    </div>
  );
};

export default About;
