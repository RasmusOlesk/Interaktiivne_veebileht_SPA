type FadeProps = {
  active: boolean;
  children: React.ReactNode;
};

const FadeContent: React.FC<FadeProps> = ({ active, children }) => {  
  return (
    <div
      style={{
        ...styles.fade,  //rakendab kõige peal styles'i, kui tingimused on täidetud
        opacity: active ? 1 : 0,  // läbipaistvust juhul kui active on true, siis 1 mnuidu 0
        pointerEvents: active ? "auto" : "none",  // khiire klick kui true, muidu mitte
      }}
    >
      {children}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {  // loob võimaluse rakendada loodud CSS väärtusi

  active: {
    backgroundColor: "#007bff", // active statusega nupu värv
  },
  fade: {  // fade effecti parameetrid
    position: "absolute",
    width: "100%",
    transition: "opacity 1s ease",
  },
};

export { FadeContent, styles }