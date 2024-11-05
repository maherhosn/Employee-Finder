import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface'; // Assuming you have the Candidate interface defined

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState([]);
  const [currentCandidateIndex, setCurrentCandidateIndex] = useState(0);
  const [savedCandidates, setSavedCandidates] = useState(() => {
    const saved = localStorage.getItem('savedCandidates');
    return saved ? JSON.parse(saved) : [];
  });
  const [candidateInView, setCandidate] = useState({
    login: '',
    id: 0,
    avatar_url: '',
    avatar: '',
    html_url: '',
    name: '',
    location: '',
    email: '',
    company: '',
    bio: ''
  });


  useEffect(() => {
    const fetchCandidates = async () => {
      const data = await searchGithub();
      setCandidates(data);
    };

    fetchCandidates();
  }, []);

  const saveCandidate = () => {
    const candidateToSave: Candidate = candidateInView;
    setSavedCandidates((prev: Candidate[]) => {
      const updated = [...prev, candidateToSave];
      localStorage.setItem('savedCandidates', JSON.stringify(updated));
      return updated;
    });
    nextCandidate();
  };

  const nextCandidate = () => {
    if (currentCandidateIndex < candidates.length - 1) {
      setCurrentCandidateIndex(currentCandidateIndex + 1);
    }
  };

  const currentCandidate: Candidate = candidates[currentCandidateIndex]; // Ensure this is defined correctly
  useEffect(() => {
    if (currentCandidate) {
      const fetchCandidate = async () => {
        try {
          const data = await searchGithubUser(currentCandidate.login);
          setCandidate(data);
        }
        catch (err) {
          console.log(err);
        }
      };
      fetchCandidate();
    }
  }, [currentCandidateIndex]);

  return (
    <div>
      {currentCandidate != candidates[candidates.length - 1] ? (
        <main>
          <h1>CandidateSearch</h1>
          <div className='candidate-card'>
            <img src={candidateInView.avatar_url} alt={candidateInView.login} />
            <h2>{candidateInView.login}</h2>
            <p>Location: {candidateInView.location}</p>
            <p>Email: {candidateInView.email}</p>
            <p>Company: {candidateInView.company}</p>
            <p>Bio: {candidateInView.bio}</p>
          </div>
          <footer>
            <button className='minus' onClick={nextCandidate}>-</button>
            <button className='plus' onClick={saveCandidate}>+</button>
          </footer>
        </main>

      ) : (
        <p className='noneSelected'>No More Candidates Available</p>
      )
      }
      {savedCandidates.length === 0 && (
        <p className='noneSelected'>No candidates have been accepted.</p>
      )}
    </div>
  );
};

export default CandidateSearch;
