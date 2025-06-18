const Logo = () => {
  return (
    <>
      <div className="text-sidebar-primary-foreground flex aspect-square size-fit min-w-[40px] items-center justify-center rounded-md">
        <img
          src="/logo.png"
          className="w-10 h-10"
          alt="logo"
          // style={{ filter: "brightness(0) invert(1)" }}
        />
      </div>
      <div className="ml-1 grid flex-1 text-left text-sm">
        <span className="mb-0.5 truncate leading-none font-semibold">
          Sharon Children Services-Ethiopia
        </span>
      </div>
    </>
  );
};

export default Logo;
