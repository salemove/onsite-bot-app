const getWindow = () => {
  if (typeof window === 'undefined')
    return null;

  return window;
};

export default function urlParam(name, targetWindow = getWindow()) {
  if (!targetWindow)
    return null;

  const href = targetWindow.location.href;
  const results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(href);
  return results && results[1] || null;
}
