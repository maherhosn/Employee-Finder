import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface'; // Assuming you have the Candidate interface defined
import { BiUnderline } from 'react-icons/bi';


// const CandidateSearch = () => {
//   const [candidates, setCandidates] = useState([]);
//   const [currentCandidateIndex, setCurrentCandidateIndex] = useState(0);
//     const [savedCandidates, setSavedCandidates] = useState(() => {
//     const saved = localStorage.getItem('savedCandidates');
//     return saved ? JSON.parse(saved) : [];
//   });

//   const [candidates, setCandidates] = useState<Candidate>({
//     login: '',
//     id: '',
//     avatar_url: '',
//     html_url: '',
//     name: '',
//     location: '',
//     email: '',
//     company: ''
//   });
// }
const CandidateSearch = () => {
  const [candidates, setCandidates] = useState([]);
  const [currentCandidateIndex, setCurrentCandidateIndex] = useState(0);
  const [savedCandidates, setSavedCandidates] = useState(() => {
    const saved = localStorage.getItem('savedCandidates');
    return saved ? JSON.parse(saved) : [];
  });



  useEffect(() => {
    // Fetch candidates from an API or use a static array for demonstration
    const fetchCandidates = async () => {
      // Replace with actual API
      const data = await searchGithub();
      setCandidates(data);
    };

    fetchCandidates();
  }, []);

  const saveCandidate = () => {
    const candidateToSave = candidates[currentCandidateIndex];
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

  // const previousCandidate = () => {
  //   if (currentCandidateIndex > 0) {
  //     setCurrentCandidateIndex(currentCandidateIndex - 1);
  //   }
  // };

  const currentCandidate = candidates[currentCandidateIndex];
 // const { , id=undefined, avatar_url=undefined, html_url=undefined, name = undefined, location = undefined, email = undefined,company=undefined, bio=undefined } = currentCandidate;
  const candidateInView:Candidate = currentCandidate;

  console.log("this is the candidate in view:" + candidateInView)

  return (
    <div>
      <main>
        <header>
          <h1>CandidateSearch</h1>
        </header>
        {currentCandidate && (
          <div className='candidate-card'>
            <img src={candidateInView.avatar_url} alt={candidateInView.login} />

            <h2>{candidateInView.login}</h2>
            <p>{candidateInView.location}</p>
            <p>{candidateInView.email}</p>
            <p>{candidateInView.company}</p>
            <p>{candidateInView.bio}</p>
          </div>
        )}
        <footer>
          <button className='minus' onClick={nextCandidate}>-</button>
          <button className='plus' onClick={saveCandidate}>+</button>
        </footer>
      </main>
      {savedCandidates.length === 0 && (
        <p>No candidates have been accepted.</p>
      )}
    </div>
  );
};

export default CandidateSearch;
