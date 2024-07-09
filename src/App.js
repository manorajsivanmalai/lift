import './App.css';
import { useRef, useEffect, useState } from 'react';
import React from 'react';

function App() {
  const optiontarget = useRef(null);
  const [value, setValue] = useState([1]);
  const [optionvalues, setOptionvalues] = useState([]);
  const [currentFloor, setCurrentFloor] = useState(1);
  const [upvalues, setUpvalues] = useState([]);
  const [downvalues,setDownvalues]=useState([]);
const[floor,setFloor]=useState([
  {
  floor:1,
  liftup:false,
  liftdown:false
},
{
  floor:2,
  liftup:false,
  liftdown:false
},
{
  floor:3,
  liftup:false,
  liftdown:false
},
{
  floor:4,
  liftup:false,
  liftdown:false
},
{
  floor:5,
  liftup:false,
  liftdown:false
}
]);

  useEffect(() => {
    const optionList = optiontarget.current.querySelectorAll('li');
    const upButtons = document.querySelectorAll('.up');
    const downButtons = document.querySelectorAll('.down');

    const handleOptionClick = (e) => {
      const optionValue = parseInt(e.target.getAttribute('value'));
      setOptionvalues((prevValue) => [...prevValue, optionValue]);
    };
   
    const handleUpClick = (e) => {
      const buttonValue = parseInt(e.target.getAttribute('value'));
      setFloor((prevvalue)=>{
        return prevvalue.map((item)=>{
          if(item.floor===buttonValue){
            return {...item,liftup:true}
          }
          return item;
        })
      })
      if(optionvalues.length===0){
        setUpvalues((prevValue) => [...prevValue, buttonValue]);
      }

    };

    const handleDownClick = (e) => {
      const buttonValue = parseInt(e.target.getAttribute('value'));
      setFloor((prevvalue)=>{
        return prevvalue.map((item)=>{
          if(item.floor===buttonValue){
            return {...item,liftdown:true}
          }
          return item;
        })
      })
      if(optionvalues.length===0){
        setDownvalues((prevValue) => [...prevValue, buttonValue]);
      }
    };

    optionList.forEach((option) => {
      option.addEventListener('click', handleOptionClick);
    });

    upButtons.forEach((button) => {
      button.addEventListener('click', handleUpClick);
    });

    downButtons.forEach((button) => {
      button.addEventListener('click', handleDownClick);
    });

    // Cleanup event listeners on unmount
    return () => {
      optionList.forEach((option) => {
        option.removeEventListener('click', handleOptionClick);
      });
      upButtons.forEach((button) => {
        button.removeEventListener('click', handleUpClick);
      });
      downButtons.forEach((button) => {
        button.removeEventListener('click', handleDownClick);
      });
    };

  }, []);

  useEffect(() => {
    const allTargets = [...new Set([...optionvalues,...upvalues,...downvalues])].sort((a, b) => a - b);
    console.log(allTargets);
    setValue(allTargets);
 
  }, [optionvalues,upvalues,downvalues]);

  useEffect(() => {
    const moveLift = async () => {
      for (const floor of value) {
        await new Promise((resolve) => setTimeout(resolve, 5000)); // Simulate lift movement delay
        moveLiftToFloor(floor);
        
      }
      console.log(currentFloor,value[value.length-1])
     if(currentFloor===value[value.length-1]){
      console.log("fkk")
      setOptionvalues([]);
      console.log(optionvalues);
     }
    };
  
    moveLift();
  }, [value]);

  const moveLiftToFloor =async (cf) => {
    const lift = document.querySelector('.lift');
    const floorHeight = 200; // Adjust this based on your layout
    const newTop = Math.abs((cf * floorHeight) - floorHeight - 800);
    if(currentFloor<cf){
      if(floor[0].liftup){
       
        lift.style.top = `${800}px`;
        setCurrentFloor(floor[0].floor);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setFloor((prevValue) => {
          return prevValue.map((item) => {
            if (item.floor === floor[0].floor) {
              return { ...item, liftup: false };
            }
            return item;
          });
        })
    }
     if(floor[1].liftup){
    
      lift.style.top = `${600}px`;
      await new Promise((resolve) => setTimeout(resolve, 5000));

      setCurrentFloor(floor[1].floor);
     
      setFloor((prevValue) => {
        return prevValue.map((item) => {
          if (item.floor === floor[1].floor) {
            return { ...item, liftup: false };
          }
          return item;
        });
      })
    }
       if(floor[2].liftup){
        lift.style.top = `${400}px`;
        console.log("400")
        await new Promise((resolve) => setTimeout(resolve, 5000));
        setCurrentFloor(floor[2].floor);
        setFloor((prevValue) => {
          return prevValue.map((item) => {
            if (item.floor === floor[2].floor) {
              return { ...item, liftup: false };
            }
            return item;
          });
        })
      }
         if(floor[3].liftup){
          lift.style.top = `${200}px`;
          setCurrentFloor(floor[3].floor);
          await new Promise((resolve) => setTimeout(resolve, 5000));
          setFloor((prevValue) => {
            return prevValue.map((item) => {
              if (item.floor === floor[3].floor) {
                return { ...item, liftup: false };
              }
              return item;
            });
          })
        }
           if(floor[4].liftup){
            lift.style.top = `${0}px`;
            setCurrentFloor(floor[4].floor);
            await new Promise((resolve) => setTimeout(resolve, 5000));
            setFloor((prevValue) => {
              return prevValue.map((item) => {
                if (item.floor === floor[4].floor) {
                  return { ...item, liftup: false };
                }
                return item;
              });
            })
  }
  lift.style.top = `${newTop}px`;
  setCurrentFloor(floor[cf-1].floor);
    }
    else if(currentFloor>cf){
      if(floor[0].liftdown){
        lift.style.top = `${800}px`;
        await new Promise((resolve) => setTimeout(resolve, 5000));
        setCurrentFloor(floor[0].floor);
        setFloor((prevValue) => {
          return prevValue.map((item) => {
            if (item.floor === floor[0].floor) {
              return { ...item, liftdown: false };
            }
            return item;
          });
        })
    }
     if(floor[1].liftdown){
      lift.style.top = `${600}px`;
     
      await new Promise((resolve) => setTimeout(resolve, 5000));
      setCurrentFloor(floor[1].floor);
      setFloor((prevValue) => {
        return prevValue.map((item) => {
          if (item.floor === floor[0].floor) {
            return { ...item, liftdown: false };
          }
          return item;
        });
      })
    }  if(floor[2].liftdown){
      lift.style.top = `${400}px`;
      await new Promise((resolve) => setTimeout(resolve, 5000));
      setCurrentFloor(floor[2].floor);
      setFloor((prevValue) => {
        return prevValue.map((item) => {
          if (item.floor === floor[2].floor) {
            return { ...item, liftdown: false };
          }
          return item;
        });
      })
    }  if(floor[3].liftdown){
      lift.style.top = `${200}px`;
      await new Promise((resolve) => setTimeout(resolve, 5000));
      setCurrentFloor(floor[3].floor);
      setFloor((prevValue) => {
        return prevValue.map((item) => {
          if (item.floor === floor[3].floor) {
            return { ...item, liftdown: false };
          }
          return item;
        });
      })
    }  if(floor[4].liftdown){
      lift.style.top = `${0}px`;
      await new Promise((resolve) => setTimeout(resolve, 5000));
      setCurrentFloor(floor[4].floor);
      setFloor((prevValue) => {
        return prevValue.map((item) => {
          if (item.floor === floor[4].floor) {
            return { ...item, liftdown: false };
          }
          return item;
        });
      })
    }
    lift.style.top = `${newTop}px`;
    setCurrentFloor(floor[cf-1].floor);
  }
}
  
  return (
    <div className="App">
      <div className="container">
        <div className="main-container">
          <div className="lift">
            <ul className="options" ref={optiontarget}>
              <li value="1">1</li>
              <li value="2">2</li>
              <li value="3">3</li>
              <li value="4">4</li>
              <li value="5">5</li>
            </ul>
          </div>
          <div className="button-main">
            <div className="down" value="5">down</div>
          </div>
          <div className="button-main1">
            <div className="up" value="4">up</div>
            <div className="down" value="4">down</div>
          </div>
          <div className="button-main2">
            <div className="up" value="3">up</div>
            <div className="down" value="3">down</div>
          </div>
          <div className="button-main3">
            <div className="up" value="2">up</div>
            <div className="down" value="2">down</div>
          </div>
          <div className="button-main4">
            <div className="up" value="1">up</div>
          </div>
          <div className="fl1"></div>
          <div className="fl2"></div>
          <div className="fl3"></div>
          <div className="fl4"></div>
        </div>
      </div>
    </div>
  );
}

export default App;
