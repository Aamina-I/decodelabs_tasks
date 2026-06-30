import React, { useState, useEffect } from 'react';

function App() {
  const [cards, setCards] = useState([]);
  const [flippedCardId, setFlippedCardId] = useState(null);
  
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  

  const fetchCards = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/cards');
      const data = await response.json();
      setCards(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question || !answer) return;

    try {
      const response = await fetch('http://127.0.0.1:8000/api/cards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, answer })
      });

      if (response.ok) {
        fetchCards();
        setQuestion('');
        setAnswer('');
      }
    } catch (error) {
      console.error("Error creating card:", error);
    }
  };

  return (
    <div style={{ 
      backgroundColor: '#f8f9fa', 
      minHeight: '100vh', 
      padding: '40px 20px', 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' 
    }}>
      <div style={{ maxWidth: '850px', margin: '0 auto' }}>
        
        {}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ color: '#2d3748', fontSize: '2.5rem', fontWeight: '700', margin: '0 0 10px 0' }}>
            Study FlashCards
          </h1>
          <p style={{ color: '#718096', margin: 0, fontSize: '1rem' }}>
            A flashcard web app powered by a stateless REST API.
          </p>
        </div>
        
        {}
        <form onSubmit={handleSubmit} style={{ 
          background: '#ffffff', 
          padding: '24px', 
          borderRadius: '12px', 
          marginBottom: '32px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.03)',
          border: '1px solid #e2e8f0'
        }}>
          <h3 style={{ margin: '0 0 16px 0', color: '#4a5568', fontSize: '1.1rem' }}>Create a New Flashcard</h3>
          <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
            <input 
              type="text" 
              placeholder="Question" 
              value={question} 
              onChange={e => setQuestion(e.target.value)} 
              style={{ flex: '2 1 200px', padding: '10px 14px', borderRadius: '6px', border: '1px solid #cbd5e0', backgroundColor: '#fff', color: '#2d3748', fontSize: '0.95rem' }} 
            />
            <input 
              type="text" 
              placeholder="Answer" 
              value={answer} 
              onChange={e => setAnswer(e.target.value)} 
              style={{ flex: '2 1 200px', padding: '10px 14px', borderRadius: '6px', border: '1px solid #cbd5e0', backgroundColor: '#fff', color: '#2d3748', fontSize: '0.95rem' }} 
            />
          </div>
          <button type="submit" style={{ 
            padding: '10px 20px', 
            background: '#48bb78', 
            color: 'white', 
            border: 'none', 
            borderRadius: '6px', 
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '0.95rem',
            transition: 'background 0.2s'
          }}>
            Add Card
          </button>
        </form>

        {}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '24px' }}>
          {cards.map(card => {
            const isFlipped = flippedCardId === card.id;
            const isSampleCard = card.id === 1;

            return (
              <div 
                key={card.id} 
                onClick={() => setFlippedCardId(isFlipped ? null : card.id)}
                style={{
                  padding: '32px 24px',
                  borderRadius: '12px',
                  border: isFlipped ? '1px solid #bee3f8' : '1px solid #e2e8f0',
                  background: isFlipped ? '#ebf8ff' : '#ffffff',
                  cursor: 'pointer',
                  textAlign: 'center',
                  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '180px',
                  position: 'relative',
                  transition: 'all 0.2s ease-in-out'
                }}
              >
                <div>
                  {}
                  {isSampleCard && (
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      fontSize: '0.7rem',
                      fontWeight: '700',
                      color: '#718096',
                      backgroundColor: '#edf2f7',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      textTransform: 'uppercase'
                    }}>
                      Sample Flashcard
                    </div>
                  )}


                  <h3 style={{ 
                    marginTop: '24px', 
                    color: isFlipped ? '#2b6cb0' : '#2d3748', 
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    lineHeight: '1.4'
                  }}>
                    {isFlipped ? card.answer : card.question}
                  </h3>
                </div>
                <p style={{ fontSize: '0.8rem', color: '#a0aec0', margin: '20px 0 0 0' }}>
                  {isFlipped ? "Showing Answer" : "Click to reveal answer"}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;